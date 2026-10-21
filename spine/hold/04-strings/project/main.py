# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal, ROUND_HALF_UP

TAX_RATE = Decimal("0.08875")  # 8.875% sales tax
CENT = Decimal("0.01")

sku = "ETH-250"
name = "Ethiopia Yirgacheffe"
quantity = 3
price = Decimal("9.95")
total = price * quantity
tax = (total * TAX_RATE).quantize(CENT, rounding=ROUND_HALF_UP)

origin = sku[:3]
grams = int(sku[4:])
print(sku[0], sku[-1], len(sku))
print(origin, grams, grams * quantity)
print(sku.split("-"), name.upper())
print(f"{quantity} x {name} ({grams} g): ${total}")
print("250" * 2, int("250") * 2)
