# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

print("roastery-etl: starting")

lines = [
    ("ORD-1001", "ETH-250", 3),
    ("ORD-1002", "COL-500", 12),
    ("ORD-1003", "KEN-1000", 2),
    ("ORD-1004", "ETH-250", 1),
]
print("lines:", len(lines))

order_id, sku, quantity = lines[0]
price = Decimal("9.95")
print("line:", order_id, sku, quantity, price * quantity)

is_wholesale = quantity >= 10
discount_code = None
print("wholesale:", is_wholesale, "| code:", discount_code)
