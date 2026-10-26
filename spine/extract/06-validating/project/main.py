# roastery-etl: turns the shop's daily order files into a report.

import csv
import json
from decimal import Decimal
from pathlib import Path

CENT = Decimal("0.01")
RAW = Path("data/raw")
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


def read_day(path):
    """One day file as a list of CSV rows: every value still text."""
    return list(csv.DictReader(read_text(path).splitlines()))


DAYS = {
    path.stem.removeprefix("orders-"): read_day(path)
    for path in sorted(RAW.glob("orders-*.csv"))
}


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


grand_total, rejected = Decimal("0"), []
for day, lines in DAYS.items():
    day_total = Decimal("0")
    for row in lines:
        try:
            day_total += price_line(parse_row(row))
        except InvalidOrder as error:
            rejected.append(error)
    print(day, len(lines), "lines", day_total)
    grand_total += day_total
print("total:", grand_total, "| rejected:", len(rejected))
for error in rejected:
    print("  rejected", error)
