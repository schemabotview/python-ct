"""Tests for the domain model: Money and the discount rules."""

from decimal import Decimal

from pipeline.model import Bulk, LineItem, Money, NoDiscount, Product, Wholesale

KENYA = Product("KEN-1000", "Kenya Nyeri", Money(Decimal("31.00")))


def test_adding_money_makes_a_new_value():
    a, b = Money(Decimal("9.95")), Money(Decimal("17.50"))
    assert a + b == Money(Decimal("27.45"))
    assert a == Money(Decimal("9.95"))


def test_multiplying_money_rounds_to_the_cent():
    assert Money(Decimal("9.95")) * Decimal("0.95") == Money(Decimal("9.45"))


def test_ten_bags_get_the_bulk_discount():
    line = LineItem("ORD-1", "2026-10-01", "ana", KENYA, 10)
    assert isinstance(line.rule, Bulk)
    assert line.total == Money(Decimal("263.50"))


def test_a_line_of_fifty_or_more_gets_the_wholesale_discount():
    line = LineItem("ORD-1", "2026-10-01", "ana", KENYA, 2)
    assert isinstance(line.rule, Wholesale)
    assert line.total == Money(Decimal("58.90"))


def test_one_bag_pays_full_price():
    line = LineItem("ORD-1", "2026-10-01", "ana", KENYA, 1)
    assert isinstance(line.rule, NoDiscount)
    assert line.total == Money(Decimal("31.00"))
