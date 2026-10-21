"""Transform: price each row, then summarise each day."""

from collections import Counter
from decimal import ROUND_HALF_UP, Decimal
from itertools import groupby

CENT = Decimal("0.01")


def line_total(price, quantity):
    """15% off ten bags or more, else 5% off $50 or more."""
    subtotal = price * quantity
    if quantity >= 10:
        discount = Decimal("0.15")
    elif subtotal >= 50:
        discount = Decimal("0.05")
    else:
        discount = Decimal("0")
    return (subtotal * (1 - discount)).quantize(CENT, rounding=ROUND_HALF_UP)


def priced(rows):
    for row in rows:
        yield {**row, "total": line_total(row["price"], row["quantity"])}


def summarise(rows):
    """One day's rows -> orders, bags, revenue and its top product."""
    orders, bags, revenue = 0, 0, Counter()
    for row in rows:
        orders += 1
        bags += row["quantity"]
        revenue[row["sku"]] += row["total"]
    top = max(revenue, key=revenue.get)
    return {"orders": orders, "bags": bags,
            "revenue": sum(revenue.values()), "top": top}


def daily_summaries(rows):
    days = groupby(rows, key=lambda row: row["date"])
    return {day: summarise(group) for day, group in days}
