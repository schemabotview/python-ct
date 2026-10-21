"""Transform: price each row, then summarise each day."""

from collections import Counter
from collections.abc import Iterable, Iterator
from decimal import ROUND_HALF_UP, Decimal
from itertools import groupby
from typing import Any

CENT = Decimal("0.01")
type Row = dict[str, Any]
type Summary = dict[str, Any]


def line_total(price: Decimal, quantity: int) -> Decimal:
    """15% off ten bags or more, else 5% off $50 or more."""
    subtotal = price * quantity
    if quantity >= 10:
        discount = Decimal("0.15")
    elif subtotal >= 50:
        discount = Decimal("0.05")
    else:
        discount = Decimal(0)
    return (subtotal * (1 - discount)).quantize(CENT, rounding=ROUND_HALF_UP)


def drop_duplicates(rows: Iterable[Row]) -> list[Row]:
    """Keep the first row of each order: the shop sometimes sends one twice."""
    seen: set[str] = set()
    unique = []
    for row in rows:
        if row["order_id"] not in seen:
            seen.add(row["order_id"])
            unique.append(row)
    return unique


def priced(rows: Iterable[Row]) -> Iterator[Row]:
    for row in rows:
        yield {**row, "total": line_total(row["price"], row["quantity"])}


def summarise(rows: Iterable[Row]) -> Summary:
    """One day's rows -> orders, bags, revenue and its top product."""
    orders, bags, revenue = 0, 0, Counter[str]()
    for row in rows:
        orders += 1
        bags += row["quantity"]
        revenue[row["sku"]] += row["total"]
    top = revenue.most_common(1)[0][0]
    return {
        "orders": orders,
        "bags": bags,
        "revenue": sum(revenue.values()),
        "top": top,
    }


def daily_summaries(rows: Iterable[Row]) -> dict[str, Summary]:
    days = groupby(rows, key=lambda row: row["date"])
    return {day: summarise(group) for day, group in days}
