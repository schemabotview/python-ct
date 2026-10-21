# roastery-etl: turns the shop's daily order files into a report.

import csv
import json
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


rejected = []
daily = daily_summaries(month_rows(rejected))

OUT.mkdir(exist_ok=True)
report = OUT / "daily_report.csv"
with report.open("w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["date", "orders", "bags", "revenue", "top_product"])
    for day, s in daily.items():
        writer.writerow([day, s["orders"], s["bags"], s["revenue"], s["top"]])
print("wrote", len(daily), "days to", report)
