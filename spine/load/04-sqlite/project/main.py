# roastery-etl: turns the shop's daily order files into a report.

import csv
import datetime as dt
import json
import sqlite3
import statistics
from collections import Counter, defaultdict
from decimal import Decimal
from itertools import groupby
from operator import itemgetter
from pathlib import Path

CENT = Decimal("0.01")
RAW = Path("data/raw")
OUT = Path("data/out")
MISSING = sentinel("MISSING")


def read_catalogue(path):
    """Product code -> price, from catalogue.json; prices become Decimal."""
    data = json.loads(path.read_text(encoding="utf-8"))
    prices = {sku: Decimal(item["price"]) for sku, item in data.items()}
    return frozendict(prices)


CATALOGUE = read_catalogue(RAW / "catalogue.json")


class InvalidOrder(Exception):
    """A line the pipeline refuses to price, and why."""


def read_text(path):
    """A day file's text: UTF-8, or Latin-1 from the shop's old till."""
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        print(path.name, "is not UTF-8: read as Latin-1")
        return path.read_text(encoding="latin-1")


def iter_rows(paths):
    """Every row of every day file, one at a time: never a month in memory."""
    for path in paths:
        yield from csv.DictReader(read_text(path).splitlines())


def parse_row(row):
    """A clean order line from a CSV row, or InvalidOrder saying why not."""
    for field in ("id", "customer", "sku", "quantity"):
        value = row.get(field, MISSING)
        if value is MISSING:
            raise InvalidOrder(f"the file has no {field} column")
        if not value:
            raise InvalidOrder(f"{row['id']}: no {field}")
    if not row["quantity"].isdigit() or row["quantity"] == "0":
        raise InvalidOrder(f"{row['id']}: quantity {row['quantity']!r}")
    if row["sku"] not in CATALOGUE:
        raise InvalidOrder(f"{row['id']}: unknown product {row['sku']}")
    return {**row, "quantity": int(row["quantity"])}


def discount_rate(quantity, subtotal):
    """15% off 10+ bags of one coffee; else 5% off a line of 50.00 or more."""
    if quantity >= 10:
        return Decimal("0.15")
    elif subtotal >= 50:
        return Decimal("0.05")
    return Decimal("0")


def to_cents(amount):
    """Round an amount of money to whole cents."""
    return amount.quantize(CENT)


def price_line(line, catalogue=CATALOGUE):
    """A valid line's total after its discount, to the cent."""
    subtotal = catalogue[line["sku"]] * line["quantity"]
    rate = discount_rate(line["quantity"], subtotal)
    return to_cents(subtotal - subtotal * rate)


def priced_lines(rows, rejected):
    """Each valid row as a line with its total; invalid rows go to rejected."""
    for row in rows:
        try:
            line = parse_row(row)
        except InvalidOrder as error:
            rejected.append(error)
            continue
        yield {**line, "total": price_line(line)}


def summarise(lines):
    """One pass over the priced lines: everything the report needs."""
    revenue, bags, customers = defaultdict(Decimal), Counter(), Counter()
    daily, weekly, totals = {}, defaultdict(Decimal), []
    for day, group in groupby(lines, key=itemgetter("date")):
        day_total = Decimal("0")
        for line in group:
            revenue[line["sku"]] += line["total"]
            bags[line["sku"]] += line["quantity"]
            customers[line["customer"]] += 1
            totals.append(line["total"])
            day_total += line["total"]
        date = dt.date.fromisoformat(day)
        daily[date] = day_total
        weekly[date.isocalendar().week] += day_total
    ranked = sorted(revenue.items(), key=lambda item: item[1], reverse=True)
    return {
        "revenue": dict(ranked), "bags": bags, "customers": customers,
        "daily": daily, "weekly": dict(weekly), "total": sum(totals),
        "mean": to_cents(statistics.mean(totals)),
        "median": statistics.median(totals),
    }


def write_report(daily, path):
    """One row per day: the date and that day's revenue."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["date", "revenue"])
        for date, amount in daily.items():
            writer.writerow([date.isoformat(), amount])


def write_summary(summary, rejected, path):
    """The month as JSON for other programs: money as strings, exactly."""
    revenue = {sku: str(amount) for sku, amount in summary["revenue"].items()}
    data = {
        "month": "2026-10",
        "total": str(summary["total"]),
        "rejected": len(rejected),
        "revenue": revenue,
    }
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


SCHEMA = """CREATE TABLE IF NOT EXISTS order_lines (
    id TEXT PRIMARY KEY, date TEXT, customer TEXT, sku TEXT,
    quantity INTEGER, total_cents INTEGER)"""
INSERT = "INSERT INTO order_lines VALUES (?, ?, ?, ?, ?, ?)"
TOTALS = "SELECT COUNT(*), SUM(total_cents) FROM order_lines"


def load_warehouse(lines, path):
    """Every priced line into SQLite, in one transaction, money in cents."""
    rows = [
        (line["id"], line["date"], line["customer"], line["sku"],
         line["quantity"], int(line["total"] * 100))
        for line in lines
    ]
    with sqlite3.connect(path) as conn:
        conn.execute(SCHEMA)
        conn.executemany(INSERT, rows)
        result = conn.execute(TOTALS).fetchone()
    conn.close()
    return result


paths = sorted(RAW.glob("orders-*.csv"))
rejected = []
lines = list(priced_lines(iter_rows(paths), rejected))
summary = summarise(lines)
write_report(summary["daily"], OUT / "daily_report.csv")
write_summary(summary, rejected, OUT / "summary.json")
count, cents = load_warehouse(lines, OUT / "warehouse.db")
print("warehouse:", count, "lines,", cents, "cents")
