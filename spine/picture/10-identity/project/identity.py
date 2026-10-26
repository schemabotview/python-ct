a = ["ETH-250", "COL-500"]
b = a
c = ["ETH-250", "COL-500"]

print(id(a), id(b), id(c))
print(a is b, a is c)
print(a == b, a == c)
