# roastery-etl: turns the shop's daily order files into a report.

import csv
import json
import math
import statistics
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

RAW = Path("data/raw")
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


rejected = []
rows = list(month_rows(rejected))
totals = [row["total"] for row in rows]
bags = sum(row["quantity"] for row in rows)

print(len(totals), "lines, mean", statistics.mean(totals))
print("median", statistics.median(totals), "mode", statistics.mode(totals))
mean = statistics.mean(totals).quantize(CENT, rounding=ROUND_HALF_UP)
print("mean, to the cent:", mean)
print(round(2.675, 2), Decimal("2.675").quantize(CENT, rounding=ROUND_HALF_UP))
print(round(Decimal("2.675"), 2), round(0.5), round(1.5))
print(bags, "bags fill", math.ceil(bags / 12), "boxes of 12")
