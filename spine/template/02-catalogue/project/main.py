# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

print("roastery-etl: starting")
CATALOGUE = frozendict({
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
})
order = {"sku": "ETH-250", "quantity": 3}
alias = order
price = CATALOGUE[order["sku"]]
print("one line:", price * order["quantity"])
