"""summarise on two hand-made lines, where every number can be checked."""

from decimal import Decimal

from pipeline.model import LineItem, Money
from pipeline.transform import summarise


def test_the_median_of_two_lines_is_whole_cents(ethiopia, kenya):
    lines = [
        LineItem("ORD-1", "2026-10-01", "ana", ethiopia, 1),
        LineItem("ORD-2", "2026-10-01", "ben", kenya, 1),
    ]
    summary = summarise(lines)
    assert summary["total"] == Money(Decimal("40.95"))
    assert summary["median"] == Money(Decimal("20.48"))
