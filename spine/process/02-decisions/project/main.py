# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal, ROUND_HALF_UP

CENT = Decimal("0.01")

catalogue = {
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
    "KEN-1000": Decimal("31.00"),
}
order = {"id": "ORD-1002", "sku": "COL-500", "quantity": 3}

quantity = order["quantity"]
subtotal = catalogue[order["sku"]] * quantity
if quantity >= 10:  # wholesale
    discount = Decimal("0.15")
elif subtotal >= 50:
    discount = Decimal("0.05")
else:
    discount = Decimal("0")
line_total = (subtotal * (1 - discount)).quantize(CENT, rounding=ROUND_HALF_UP)
print(order["id"], subtotal, discount, line_total)
if not order.get("coupon"):
    print("no coupon on", order["id"])
