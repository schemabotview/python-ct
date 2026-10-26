import inspect

PRICES = {"ETH-250": 9.95, "COL-500": 17.50}


def line_total(sku, qty):
    for frame in inspect.stack():
        print(f"{frame.function:<12} line {frame.lineno}")
    return PRICES[sku] * qty


def order_total(order):
    total = 0
    for sku, qty in order.items():
        total += line_total(sku, qty)
    return total


print(order_total({"ETH-250": 2}))
