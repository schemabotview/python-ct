# roastery-etl: turns the shop's daily order files into a report.

orders = [
    ("ORD-1001", "ETH-250", 3),
    ("ORD-1002", "COL-500", 1),
    ("ORD-1003", "ETH-250", 2),
]

order_id, sku, quantity = orders[0]
print(order_id, sku, quantity)
print(len(orders), orders[1][1])
first, *rest = orders
print(first[0], len(rest), rest[-1])
orders[0][2] = 4
