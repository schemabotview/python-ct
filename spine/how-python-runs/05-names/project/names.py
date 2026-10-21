order = ["ETH-250", "COL-500"]
same = order
same.append("BRA-1K")

print(order)
print(same is order)
print(id(order) == id(same))
