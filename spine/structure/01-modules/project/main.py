# roastery-etl: turns the shop's daily order files into a report.

import csv
import sqlite3
from collections import Counter
from decimal import ROUND_HALF_UP, Decimal
from itertools import groupby
from pathlib import Path

from extract import month_rows

CENT = Decimal("0.01")
OUT = Path("data/out")
FIELDS = ("order_id", "date", "customer", "sku", "quantity")
INSERT = "INSERT INTO order_lines VALUES (?, ?, ?, ?, ?, ?)"


def line_total(price, quantity):
    """15% off ten bags or more, else 5% off $50 or more."""
    subtotal = price * quantity
    if quantity >= 10:
        discount = Decimal("0.15")
    elif subtotal >= 50:
        discount = Decimal("0.05")
    else:
        discount = Decimal("0")
    return (subtotal * (1 - discount)).quantize(CENT, rounding=ROUND_HALF_UP)


def priced(rows):
    for row in rows:
        yield {**row, "total": line_total(row["price"], row["quantity"])}


def summarise(rows):
    """One day's rows -> orders, bags, revenue and its top product."""
    orders, bags, revenue = 0, 0, Counter()
    for row in rows:
        orders += 1
        bags += row["quantity"]
        revenue[row["sku"]] += row["total"]
    top = max(revenue, key=revenue.get)
    return {"orders": orders, "bags": bags,
            "revenue": sum(revenue.values()), "top": top}


def daily_summaries(rows):
    days = groupby(rows, key=lambda row: row["date"])
    return {day: summarise(group) for day, group in days}


def records(rows):
    """Rows as database records, each total stored as exact text."""
    return [[row[f] for f in FIELDS] + [str(row["total"])] for row in rows]


def connect():
    OUT.mkdir(exist_ok=True)
    con = sqlite3.connect(OUT / "warehouse.db")
    con.executescript(Path("schema.sql").read_text(encoding="utf-8"))
    return con


def load(con, rows):
    """Replace October, all or nothing: running it twice changes nothing."""
    with con:
        con.execute("DELETE FROM order_lines WHERE date LIKE '2026-10-%'")
        con.executemany(INSERT, rows)
    return con.execute("SELECT COUNT(*) FROM order_lines").fetchone()[0]


def write_csv_atomic(path, rows):
    tmp = path.with_name(path.name + ".tmp")
    with tmp.open("w", newline="", encoding="utf-8") as f:
        csv.writer(f).writerows(rows)
    tmp.replace(path)  # atomic: readers see the old file or the new, never half


def main():
    """Extract, transform, load: October's files in, three outputs out."""
    rejected = []
    rows = list(priced(month_rows(rejected)))
    daily = daily_summaries(rows)
    loaded = load(connect(), records(rows))
    header = ["date", "orders", "bags", "revenue", "top_product"]
    days = [[d, s["orders"], s["bags"], s["revenue"], s["top"]]
            for d, s in daily.items()]
    write_csv_atomic(OUT / "daily_report.csv", [header, *days])
    reasons = [["file", "order", "reason"], *rejected]
    write_csv_atomic(OUT / "rejected.csv", reasons)
    revenue = sum(s["revenue"] for s in daily.values())
    print(f"extract:   {len(rows):,} rows read, {len(rejected)} rejected")
    print(f"transform: {len(daily)} days, ${revenue:,.2f} revenue")
    print(f"load:      {loaded:,} rows in warehouse.db, two CSV files")


main()
