# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal, ROUND_HALF_UP

CENT = Decimal("0.01")

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


def price_line(order, catalogue):
    """Return an order's line total in dollars, after any discount."""
    quantity = order["quantity"]
    subtotal = catalogue[order["sku"]] * quantity
    if quantity >= 10:  # wholesale
        discount = Decimal("0.15")
    elif subtotal >= 50:
        discount = Decimal("0.05")
    else:
        discount = Decimal("0")
    return (subtotal * (1 - discount)).quantize(CENT, rounding=ROUND_HALF_UP)


day_total = Decimal("0")
for order in orders:
    line_total = price_line(order, catalogue)
    day_total += line_total
    print(order["id"], line_total)
print("day total:", day_total)
print(price_line.__doc__)
