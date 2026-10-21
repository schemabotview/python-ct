# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

catalogue = {
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
    "KEN-1000": Decimal("31.00"),
}
orders = [
    {"id": "ORD-1001", "sku": "ETH-250", "quantity": 3},
    {"id": "ORD-1002", "sku": "COL-500", "quantity": 12},
    {"id": "ORD-1003", "sku": "KEN-1000", "quantity": 2},
    {"id": "ORD-1004", "sku": "ETH-250", "quantity": 1},
]

subtotals = [catalogue[o["sku"]] * o["quantity"] for o in orders]
print(subtotals)
big = [o["id"] for o in orders if o["quantity"] >= 3]
print(big)
skus = {o["sku"] for o in orders}
print(sorted(skus))
sale_prices = {sku: price * Decimal("0.9") for sku, price in catalogue.items()}
print(sale_prices["ETH-250"], len(sale_prices))
print(sum(o["quantity"] for o in orders))
