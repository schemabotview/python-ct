# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

print("roastery-etl: starting")

sku = "ETH-250"
price = Decimal("9.95")
quantity = 3
print("line:", sku, quantity, price * quantity)

origin = sku[:3]
grams = int(sku[4:])
print("product:", origin, grams, "g")
