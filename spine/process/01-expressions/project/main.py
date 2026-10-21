# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal, ROUND_HALF_UP

CENT = Decimal("0.01")
TAX_RATE = Decimal("0.08875")  # 8.875% sales tax

catalogue = {
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
    "KEN-1000": Decimal("31.00"),
}
order = {"id": "ORD-1002", "sku": "COL-500", "quantity": 3}

price = catalogue[order["sku"]]
line_total = price * order["quantity"]
tax = (line_total * TAX_RATE).quantize(CENT, rounding=ROUND_HALF_UP)
print(line_total, tax, line_total + tax)
print(2 + 3 * 4, (2 + 3) * 4, -2 ** 2)
print(1 <= order["quantity"] <= 50, order["quantity"] >= 10 or line_total > 50)
day_total = Decimal("0")
day_total += line_total
print(day_total, 7 // 2 * 2 + 7 % 2)
