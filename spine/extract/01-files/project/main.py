# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

CENT = Decimal("0.01")

CATALOGUE = frozendict({
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
    "KEN-1000": Decimal("31.00"),
})

with open("data/raw/orders-2026-10-01.csv", encoding="utf-8") as file:
    header = file.readline().strip().split(",")
    ORDERS = [dict(zip(header, line.strip().split(","))) for line in file]
for order in ORDERS:
    if order["quantity"].isdigit():
        order["quantity"] = int(order["quantity"])

DAYS = {
    "2026-10-01": ORDERS,
    "2026-10-02": [
        {"id": "ORD-1007", "customer": "lena", "sku": "COL-500", "quantity": 1},
    ],
}


class InvalidOrder(Exception):
    """A line the pipeline refuses to price, and why."""


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
