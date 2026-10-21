"""The pipeline's data as types, not dicts."""

from dataclasses import dataclass, field
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


@dataclass
class Order:
    """An order and its line items: it sizes, iterates and prints like one."""

    id: str
    customer: str
    items: list = field(default_factory=list)

    def __repr__(self):
        return f"<Order {self.id} for {self.customer}: {len(self)} items>"

    def __len__(self):
        return len(self.items)

    def __iter__(self):
        return iter(self.items)

    @property
    def total(self):
        return sum(item.total for item in self)
