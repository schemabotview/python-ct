# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

CENT = Decimal("0.01")

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
        with open(path, encoding="utf-8") as file:
            return file.read()
    except UnicodeDecodeError:
        print(path, "is not UTF-8: read as Latin-1")
        with open(path, encoding="latin-1") as file:
            return file.read()


def read_day(path):
    """One day file as a list of order dicts."""
    header, *rows = read_text(path).splitlines()
    orders = [dict(zip(header.split(","), row.split(","))) for row in rows]
    for order in orders:
        if order["quantity"].isdigit():
            order["quantity"] = int(order["quantity"])
    return orders


DAYS = {
    "2026-10-01": read_day("data/raw/orders-2026-10-01.csv"),
    "2026-10-02": read_day("data/raw/orders-2026-10-02.csv"),
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


lines = [*day for day in DAYS.values()]
priced, rejected = [], []
for line in lines:
    try:
        total = price_line(line)
    except InvalidOrder as error:
        rejected.append(error)
        continue
    priced.append((line, total))
    print(line["id"], line["sku"], line["quantity"], total)

grand_total = sum(total for line, total in priced)
print("total:", grand_total, "| rejected:", len(rejected))
for error in rejected:
    print("  rejected", error)
