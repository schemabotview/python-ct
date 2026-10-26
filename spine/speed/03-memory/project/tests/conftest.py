"""Fixtures: the objects many tests need, made fresh for each test."""

from decimal import Decimal

import pytest

from pipeline.model import Money, Product


@pytest.fixture
def kenya():
    """One product, priced as in the catalogue: 31.00 a bag."""
    return Product("KEN-1000", "Kenya Nyeri", Money(Decimal("31.00")))


@pytest.fixture
def ethiopia():
    """The cheapest product: 9.95 a bag."""
    return Product("ETH-250", "Ethiopia Yirgacheffe", Money(Decimal("9.95")))


@pytest.fixture
def good_row():
    """A valid CSV row: a test changes one field to break it."""
    return {
        "id": "ORD-9001",
        "date": "2026-10-31",
        "customer": "ana",
        "sku": "KEN-1000",
        "quantity": "2",
    }
