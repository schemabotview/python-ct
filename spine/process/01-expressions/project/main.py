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
]
DAYS = {"2026-10-01": ORDERS}

print("roastery-etl: starting")
line = ORDERS[1]
subtotal = CATALOGUE[line["sku"]] * line["quantity"]
total = (subtotal - subtotal * Decimal("0.15")).quantize(CENT)
print("line:", line["id"], subtotal, total)
