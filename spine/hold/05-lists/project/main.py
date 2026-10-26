# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

print("roastery-etl: starting")

skus = ["ETH-250", "COL-500", "KEN-1000", "ETH-250"]
quantities = [3, 12, 2, 1]
print("lines:", len(skus), "| bags:", sum(quantities))

sku = skus[0]
price = Decimal("9.95")
quantity = quantities[0]
print("line:", sku, quantity, price * quantity)

is_wholesale = quantity >= 10
discount_code = None
print("wholesale:", is_wholesale, "| code:", discount_code)
