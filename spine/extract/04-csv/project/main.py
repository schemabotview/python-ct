# roastery-etl: turns the shop's daily order files into a report.

import csv
from decimal import Decimal
from pathlib import Path

CENT = Decimal("0.01")
RAW = Path("data/raw")

CATALOGUE = frozendict({
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
    "KEN-1000": Decimal("31.00"),
})


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
    """One day file as a list of order dicts."""
    orders = list(csv.DictReader(read_text(path).splitlines()))
    for order in orders:
        if order["quantity"].isdigit():
            order["quantity"] = int(order["quantity"])
    return orders


DAYS = {
    path.stem.removeprefix("orders-"): read_day(path)
    for path in sorted(RAW.glob("orders-*.csv"))
}


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
    """The line's total after discount; InvalidOrder if it cannot be priced."""
    match line:
        case {"sku": sku, "quantity": int(quantity)} if quantity > 0:
            pass
        case _:
            raise InvalidOrder(f"{line['id']}: quantity {line['quantity']!r}")
    if sku not in catalogue:
        raise InvalidOrder(f"{line['id']}: unknown product {sku}")
    subtotal = catalogue[sku] * quantity
    rate = discount_rate(quantity, subtotal)
    return to_cents(subtotal - subtotal * rate)


grand_total, rejected = Decimal("0"), []
for day, lines in DAYS.items():
    day_total = Decimal("0")
    for line in lines:
        try:
            day_total += price_line(line)
        except InvalidOrder as error:
            rejected.append(error)
    print(day, len(lines), "lines", day_total)
    grand_total += day_total
print("total:", grand_total, "| rejected:", len(rejected))
for error in rejected:
    print("  rejected", error)
