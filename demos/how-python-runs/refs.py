import gc
import sys

order = {"sku": "ETH-250", "qty": 2}
print(sys.getrefcount(order))

alias = order
print(sys.getrefcount(order))

del alias
print(sys.getrefcount(order))

loop = {"sku": "COL-500"}
loop["self"] = loop
del loop
print(gc.collect())
