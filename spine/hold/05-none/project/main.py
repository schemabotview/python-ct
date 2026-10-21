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
coupon = None  # most orders have no coupon
is_wholesale = quantity >= 10

print(is_wholesale, type(is_wholesale))
print(coupon is None, type(coupon))
print(bool(0), bool(3), bool(""), bool("ETH-250"))
print(coupon.upper())
