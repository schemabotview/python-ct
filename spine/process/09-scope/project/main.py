# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

CENT = Decimal("0.01")

CATALOGUE = frozendict({
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
    "KEN-1000": Decimal("31.00"),
})

ORDERS = [
    {"id": "ORD-1001", "customer": "maya", "sku": "ETH-250", "quantity": 3},
    {"id": "ORD-1002", "customer": "omar", "sku": "COL-500", "quantity": 12},
    {"id": "ORD-1003", "customer": "lena", "sku": "KEN-1000", "quantity": 2},
    {"id": "ORD-1004", "customer": "maya", "sku": "ETH-250", "quantity": 1},
    {"id": "ORD-1005", "customer": "jo", "sku": "ETH-250", "quantity": "three"},
]
DAYS = {
    "2026-10-01": ORDERS,
    "2026-10-02": [
        {"id": "ORD-1007", "customer": "lena", "sku": "COL-500", "quantity": 1},
    ],
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


def price_line(sku, quantity, catalogue=CATALOGUE):
    """The line's total after its discount, to the cent."""
    subtotal = catalogue[sku] * quantity
    rate = discount_rate(quantity, subtotal)
    return to_cents(subtotal - subtotal * rate)


lines = [*day for day in DAYS.values()]
priced, skipped = [], 0
for line in lines:
    match line:
        case {"sku": sku, "quantity": int(quantity)} if quantity > 0:
            pass
        case _:
            skipped += 1
            continue
    total = price_line(sku, quantity)
    priced.append((line, total))
    print(line["id"], sku, quantity, total)

bags = sum(line["quantity"] for line, total in priced)
customers = sorted({line["customer"] for line, total in priced})
grand_total = sum(total for line, total in priced)
print("total:", grand_total, "| bags:", bags, "| skipped:", skipped)
print("customers:", customers)
