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
DAYS = {"2026-10-01": ORDERS}

day_total, skipped = Decimal("0"), 0
for line in ORDERS:
    match line:
        case {"sku": sku, "quantity": int(quantity)} if quantity > 0:
            pass
        case _:
            skipped += 1
            continue
    subtotal = CATALOGUE[sku] * quantity
    if quantity >= 10:
        rate = Decimal("0.15")
    elif subtotal >= 50:
        rate = Decimal("0.05")
    else:
        rate = Decimal("0")
    total = (subtotal - subtotal * rate).quantize(CENT)
    day_total += total
    print(line["id"], sku, quantity, total)
print("day total:", day_total, "| skipped:", skipped)

i = 0
while i < len(ORDERS):
    line = ORDERS[i]
    if isinstance(line["quantity"], int) and line["quantity"] >= 10:
        print("first wholesale order:", line["id"])
        break
    i += 1
