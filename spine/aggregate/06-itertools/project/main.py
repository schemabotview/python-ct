# roastery-etl: turns the shop's daily order files into a report.

import csv
import json
from decimal import Decimal, ROUND_HALF_UP
from itertools import chain, groupby, islice
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
rows = month_rows(rejected)

first_days = islice(groupby(rows, key=lambda row: row["date"]), 3)
for day, group in first_days:
    print(day, sum(1 for _ in group), "orders")

late = [{"order_id": "ORD-9001", "date": "2026-10-31"}]
everything = chain(month_rows([]), late)
print("with the late order:", sum(1 for _ in everything), "rows")
row_4000 = next(islice(month_rows([]), 3999, None))
print("row 4,000:", row_4000["order_id"], row_4000["date"])
