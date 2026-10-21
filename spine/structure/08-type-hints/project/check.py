from decimal import Decimal

from pipeline.transform import line_total

print(line_total(Decimal("9.95"), "3"))
