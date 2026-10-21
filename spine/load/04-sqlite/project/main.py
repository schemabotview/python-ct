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

rows = [[r[f] for f in FIELDS] + [str(r["total"])] for r in month_rows([])]
OUT.mkdir(exist_ok=True)
con = sqlite3.connect(OUT / "warehouse.db")
con.executescript(Path("schema.sql").read_text(encoding="utf-8"))
with con:
    con.executemany(INSERT, rows)
late = ["ORD-9001", "2026-10-31", "ana", "ETH-250", 1, "9.95"]
try:
    with con:
        con.execute(INSERT, late)
        con.execute(INSERT, rows[0])
except sqlite3.IntegrityError as error:
    print("rolled back:", error)
query = "SELECT sku, COUNT(*), SUM(quantity) FROM order_lines GROUP BY sku"
for sku, lines, bags in con.execute(query):
    print(sku, lines, "lines", bags, "bags")
