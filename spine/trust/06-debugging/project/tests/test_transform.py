from decimal import Decimal

from pipeline.transform import line_total


def test_no_discount_under_fifty_dollars():
    assert line_total(Decimal("9.95"), 3) == Decimal("29.85")


def test_fifty_dollars_or_more_is_five_percent_off():
    assert line_total(Decimal("17.50"), 3) == Decimal("49.88")


def test_ten_bags_or_more_is_fifteen_percent_off():
    assert line_total(Decimal("17.50"), 12) == Decimal("178.50")
