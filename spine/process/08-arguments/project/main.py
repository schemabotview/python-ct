# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal, ROUND_HALF_UP

CENT = Decimal("0.01")


def line_total(price, quantity, discount=Decimal("0")):
    amount = price * quantity * (1 - discount)
    return amount.quantize(CENT, rounding=ROUND_HALF_UP)


def add_line(sku, lines=[]):  # the trap: one list, made once
    lines.append(sku)
    return lines


print(line_total(Decimal("17.50"), 12, Decimal("0.15")))
print(line_total(quantity=2, price=Decimal("31.00")))
print(add_line("ETH-250"))
print(add_line("COL-500"))
print(add_line.__defaults__)
