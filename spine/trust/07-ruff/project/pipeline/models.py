"""The pipeline's data as types, not dicts."""

from collections.abc import Iterator
from dataclasses import dataclass, field
from decimal import Decimal

from pipeline.transform import line_total


@dataclass(frozen=True)
class LineItem:
    """One product on an order. It cannot exist with a quantity below 1."""

    sku: str
    price: Decimal
    quantity: int

    def __post_init__(self) -> None:
        if self.quantity < 1:
            raise ValueError(f"quantity {self.quantity} is below 1")

    @property
    def total(self) -> Decimal:
        return line_total(self.price, self.quantity)


@dataclass
class Order:
    """An order and its line items: it sizes, iterates and prints like one."""

    id: str
    customer: str
    items: list[LineItem] = field(default_factory=list)

    def __repr__(self) -> str:
        return f"<Order {self.id} for {self.customer}: {len(self)} items>"

    def __len__(self) -> int:
        return len(self.items)

    def __iter__(self) -> Iterator[LineItem]:
        return iter(self.items)

    @property
    def total(self) -> Decimal:
        return sum((item.total for item in self), Decimal(0))
