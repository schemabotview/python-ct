"""The pipeline's data as types, not dicts."""

from dataclasses import dataclass
from decimal import Decimal

from pipeline.transform import line_total


@dataclass(frozen=True)
class LineItem:
    """One product on an order. It cannot exist with a quantity below 1."""

    sku: str
    price: Decimal
    quantity: int

    def __post_init__(self):
        if self.quantity < 1:
            raise ValueError(f"quantity {self.quantity} is below 1")

    @property
    def total(self):
        return line_total(self.price, self.quantity)


if __name__ == "__main__":
    item = LineItem("COL-500", Decimal("17.50"), 12)
    print(item.total, "for", item)
    try:
        LineItem("COL-500", Decimal("17.50"), -2)
    except ValueError as error:
        print("rejected:", error)
    try:
        item.quantity = 0
    except AttributeError as error:
        print(type(error).__name__ + ":", error)
