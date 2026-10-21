# roastery-etl: turns the shop's daily order files into a report.

import csv
import json
from collections import defaultdict
from datetime import date, timedelta
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
by_day = defaultdict(Decimal)
for row in month_rows(rejected):
    by_day[date.fromisoformat(row["date"])] += row["total"]

best = max(by_day, key=by_day.get)
print("best day:", best, best.strftime("%A"), by_day[best])
by_week = defaultdict(Decimal)
for day, total in by_day.items():
    by_week[day.isocalendar().week] += total
for week, total in sorted(by_week.items()):
    print("week", week, total)
print(best + timedelta(days=7), (date(2026, 10, 31) - best).days, "days left")
