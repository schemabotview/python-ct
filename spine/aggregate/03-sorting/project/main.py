# roastery-etl: turns the shop's daily order files into a report.

import csv
import json
from collections import defaultdict
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
by_product = defaultdict(Decimal)
by_customer = defaultdict(Decimal)
for row in month_rows(rejected):
    by_product[row["sku"]] += row["total"]
    by_customer[row["customer"]] += row["total"]

ranked = sorted(by_product.items(), key=lambda item: item[1], reverse=True)
for sku, total in ranked:
    print(sku, total)
top = sorted(by_customer, key=by_customer.get, reverse=True)[:3]
print("top customers:", top)
print(sorted(["maya", "Luna Café, Ltd", "ana"]))
print(sorted(["maya", "Luna Café, Ltd", "ana"], key=str.lower))
