"""Every way a row can be refused, as one parametrised test."""

import pytest

from pipeline.errors import InvalidRow, UnknownProduct
from pipeline.validate import parse_row


def test_a_good_row_becomes_a_line(good_row):
    assert parse_row(good_row).quantity == 2


@pytest.mark.parametrize(
    ("field", "value", "error"),
    [
        pytest.param("customer", "", InvalidRow, id="no-customer"),
        pytest.param("quantity", "three", InvalidRow, id="quantity-in-words"),
        pytest.param("quantity", "-1", InvalidRow, id="negative-quantity"),
        pytest.param("quantity", "0", InvalidRow, id="zero-bags"),
        pytest.param("sku", "GUA-250", UnknownProduct, id="unknown-product"),
    ],
)
def test_a_bad_row_is_refused(good_row, field, value, error):
    with pytest.raises(error):
        parse_row({**good_row, field: value})
