"""Transform: price each valid line, then summarise the month."""

import datetime as dt
import statistics
from collections import Counter, defaultdict
from decimal import Decimal
from itertools import groupby
from operator import itemgetter

from .validate import CATALOGUE, InvalidOrder, parse_row

CENT = Decimal("0.01")


def discount_rate(quantity, subtotal):
    """15% off 10+ bags of one coffee; else 5% off a line of 50.00 or more."""
    if quantity >= 10:
        return Decimal("0.15")
    elif subtotal >= 50:
        return Decimal("0.05")
    return Decimal("0")


def to_cents(amount):
    """Round an amount of money to whole cents."""
    return amount.quantize(CENT)


def price_line(line, catalogue=CATALOGUE):
    """A valid line's total after its discount, to the cent."""
    subtotal = catalogue[line["sku"]] * line["quantity"]
    rate = discount_rate(line["quantity"], subtotal)
    return to_cents(subtotal - subtotal * rate)


def priced_lines(rows, rejected):
    """Each valid row as a line with its total; invalid rows go to rejected."""
    for row in rows:
        try:
            line = parse_row(row)
        except InvalidOrder as error:
            rejected.append(error)
            continue
        yield {**line, "total": price_line(line)}


def summarise(lines):
    """One pass over the priced lines: everything the report needs."""
    revenue, bags, customers = defaultdict(Decimal), Counter(), Counter()
    daily, weekly, totals = {}, defaultdict(Decimal), []
    for day, group in groupby(lines, key=itemgetter("date")):
        day_total = Decimal("0")
        for line in group:
            revenue[line["sku"]] += line["total"]
            bags[line["sku"]] += line["quantity"]
            customers[line["customer"]] += 1
            totals.append(line["total"])
            day_total += line["total"]
        date = dt.date.fromisoformat(day)
        daily[date] = day_total
        weekly[date.isocalendar().week] += day_total
    ranked = sorted(revenue.items(), key=lambda item: item[1], reverse=True)
    return {
        "revenue": dict(ranked), "bags": bags, "customers": customers,
        "daily": daily, "weekly": dict(weekly), "total": sum(totals),
        "mean": to_cents(statistics.mean(totals)),
        "median": statistics.median(totals),
    }
