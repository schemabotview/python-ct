"""The pipeline's data as types, not dicts."""

from dataclasses import dataclass


@dataclass
class Order:
    """One order from the shop's daily file."""

    id: str
    date: str
    customer: str
    sku: str
    quantity: int

    def is_wholesale(self):
        return self.quantity >= 10
