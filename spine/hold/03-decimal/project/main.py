# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal, ROUND_HALF_UP

TAX_RATE = Decimal("0.08875")  # 8.875% sales tax
CENT = Decimal("0.01")

sku = "ETH-250"
quantity = 3
price = Decimal("9.95")
total = price * quantity
tax = (total * TAX_RATE).quantize(CENT, rounding=ROUND_HALF_UP)

print(total, tax, total + tax)
print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))
print(Decimal(9.95))
print(price * 1.5)
