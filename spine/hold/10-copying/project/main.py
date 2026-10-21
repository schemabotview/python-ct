# roastery-etl: turns the shop's daily order files into a report.

import copy

order = {
    "id": "ORD-1001",
    "customer": "maya",
    "lines": [{"sku": "ETH-250", "quantity": 3}],
}

same = order
shallow = order.copy()
deep = copy.deepcopy(order)
same["customer"] = "omar"
shallow["lines"].append({"sku": "COL-500", "quantity": 1})

print(order["customer"], len(order["lines"]))
print(len(shallow["lines"]), len(deep["lines"]))
print(same is order, shallow is order, shallow["lines"] is order["lines"])
