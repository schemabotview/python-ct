# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

print("roastery-etl: starting")

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
print("lines:", len(ORDERS))

first = ORDERS[0]
price = CATALOGUE[first["sku"]]
print("line:", first["id"], first["sku"], first["quantity"] * price)
