import inspect

PRICES = {"ETH-250": 9.5, "COL-500": 16.0}


def line_total(sku, qty):
    print([frame.function for frame in inspect.stack()])
    return PRICES[sku] * qty


def order_total(order):
    total = 0
    for sku, qty in order.items():
        total += line_total(sku, qty)
    return total


print(order_total({"ETH-250": 2}))
