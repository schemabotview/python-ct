import gc
import sys

order = {"id": "ORD-1001"}
print(sys.getrefcount(order))
alias = order
print(sys.getrefcount(order))
del alias
print(sys.getrefcount(order))

a = {}
b = {"other": a}
a["other"] = b
del a, b
print(gc.collect())
