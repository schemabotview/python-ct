"""Transform: keep the valid lines, then summarise the month."""

import datetime as dt
import statistics
from collections import Counter, defaultdict
from collections.abc import Iterable, Iterator
from decimal import Decimal
from itertools import groupby
from operator import attrgetter
from typing import TypedDict

from .model import CENT, LineItem, Money
from .validate import InvalidOrder, Row, parse_row

Summary = TypedDict("Summary", {
    "revenue": dict[str, Money], "bags": Counter[str],
    "customers": Counter[str], "daily": dict[dt.date, Money],
    "weekly": dict[int, Money], "total": Money,
    "mean": Money, "median": Money,
})


def priced_lines(
    rows: Iterable[Row], rejected: list[InvalidOrder]
) -> Iterator[LineItem]:
    """Each valid row as a LineItem; invalid rows go to rejected."""
    for row in rows:
        try:
            yield parse_row(row)
        except InvalidOrder as error:
            rejected.append(error)


def summarise(lines: Iterable[LineItem]) -> Summary:
    """One pass over the priced lines: everything the report needs."""
    revenue: defaultdict[str, Money] = defaultdict(Money)
    bags: Counter[str] = Counter()
    customers: Counter[str] = Counter()
    daily: dict[dt.date, Money] = {}
    weekly: defaultdict[int, Money] = defaultdict(Money)
    totals: list[Money] = []
    for day, group in groupby(lines, key=attrgetter("date")):
        day_total = Money()
        for line in group:
            total = line.total
            revenue[line.product.sku] += total
            bags[line.product.sku] += line.quantity
            customers[line.customer] += 1
            totals.append(total)
            day_total += total
        date = dt.date.fromisoformat(day)
        daily[date] = day_total
        weekly[date.isocalendar().week] += day_total
    ranked = sorted(revenue.items(), key=lambda item: item[1].amount,
                    reverse=True)
    amounts = [total.amount for total in totals]
    return {
        "revenue": dict(ranked), "bags": bags, "customers": customers,
        "daily": daily, "weekly": dict(weekly), "total": sum(totals, Money()),
        "mean": Money(statistics.mean(amounts).quantize(CENT)),
        "median": Money(statistics.median(amounts)),
    }
