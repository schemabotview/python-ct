# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

print("roastery-etl: starting")
price = Decimal("9.95")
quantity = 3
print("one line:", price * quantity)
