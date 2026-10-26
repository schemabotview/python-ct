# roastery-etl: turns the shop's daily order files into a report.

import csv
import datetime as dt
import json
import math
import statistics
from collections import Counter, defaultdict
from decimal import Decimal
from itertools import groupby, islice
from operator import itemgetter
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


paths = sorted(RAW.glob("orders-*.csv"))
rejected = []
lines = priced_lines(iter_rows(paths), rejected)
daily = {}
for day, group in groupby(lines, key=itemgetter("date")):
    daily[dt.date.fromisoformat(day)] = sum(line["total"] for line in group)

print("days:", len(daily), "| rejected:", len(rejected))
for date, amount in islice(daily.items(), 3):
    print(date, amount)
