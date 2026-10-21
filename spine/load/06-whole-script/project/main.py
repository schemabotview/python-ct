# roastery-etl: turns the shop's daily order files into a report.

import csv
import json
import sqlite3
from collections import Counter
from decimal import Decimal, ROUND_HALF_UP
from itertools import groupby
from pathlib import Path

RAW = Path("data/raw")
OUT = Path("data/out")
CENT = Decimal("0.01")


class InvalidRow(ValueError):
    """A row that must not be priced."""


def line_total(price, quantity):
    """Course 5's rule: 15% off ten bags or more, else 5% off $50 or more."""
    subtotal = price * quantity
    if quantity >= 10:
        discount = Decimal("0.15")
    elif subtotal >= 50:
        discount = Decimal("0.05")
    else:
        discount = Decimal("0")
    return (subtotal * (1 - discount)).quantize(CENT, rounding=ROUND_HALF_UP)


def validate(row, catalogue):
    if row["sku"] not in catalogue:
        raise InvalidRow(f"unknown sku {row['sku']}")
    if not row["quantity"].isdigit() or int(row["quantity"]) == 0:
        raise InvalidRow(f"bad quantity {row['quantity']!r}")
    quantity = int(row["quantity"])
    price = Decimal(catalogue[row["sku"]]["price"])
    return {**row, "quantity": quantity, "total": line_total(price, quantity)}


def month_rows(rejected):
    """Every valid row of October, streamed; the bad ones go to rejected."""
    with (RAW / "catalogue.json").open(encoding="utf-8") as f:
        catalogue = json.load(f)
    for path in sorted(RAW.glob("orders-*.csv")):
        with path.open(newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                try:
                    yield validate(row, catalogue)
                except InvalidRow as error:
                    rejected.append((path.name, row["order_id"], str(error)))


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
    """Course 7's transform: one summary per day, keyed by date."""
    days = groupby(rows, key=lambda row: row["date"])
    return {day: summarise(group) for day, group in days}


FIELDS = ("order_id", "date", "customer", "sku", "quantity")
INSERT = "INSERT INTO order_lines VALUES (?, ?, ?, ?, ?, ?)"


def records(rows):
    """Rows as database records, each total stored as exact text."""
    return [[row[f] for f in FIELDS] + [str(row["total"])] for row in rows]


def connect():
    """The warehouse, data/out/warehouse.db, built from schema.sql."""
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
    rows = list(month_rows(rejected))
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
