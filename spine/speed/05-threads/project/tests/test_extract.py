from decimal import Decimal

import pytest

from pipeline.extract import InvalidRow, validate


@pytest.fixture
def catalogue():
    return {"ETH-250": {"name": "Ethiopia Yirgacheffe", "price": "9.95"}}


def test_a_good_row_is_cleaned(catalogue):
    clean = validate({"sku": "ETH-250", "quantity": "3"}, catalogue)
    assert clean["quantity"] == 3
    assert clean["price"] == Decimal("9.95")


@pytest.mark.parametrize(
    ("sku", "quantity", "reason"),
    [
        pytest.param("PER-250", "1", "unknown sku", id="unknown-sku"),
        pytest.param("ETH-250", "three", "bad quantity", id="a-word"),
        pytest.param("ETH-250", "0", "bad quantity", id="zero"),
    ],
)
def test_a_bad_row_is_rejected(catalogue, sku, quantity, reason):
    with pytest.raises(InvalidRow, match=reason):
        validate({"sku": sku, "quantity": quantity}, catalogue)
