"""The roastery's domain: the things the pipeline is about."""

from dataclasses import dataclass
from decimal import Decimal

CENT = Decimal("0.01")


@dataclass
class Product:
    """A coffee the roastery sells: its code, its name and its price."""

    sku: str
    name: str
    price: Decimal

    def cost(self, quantity: int) -> Decimal:
        """The price of this many bags, before any discount."""
        return self.price * quantity


def discount_rate(quantity: int, subtotal: Decimal) -> Decimal:
    """15% off 10+ bags of one coffee; else 5% off a line of 50.00 or more."""
    if quantity >= 10:
        return Decimal("0.15")
    elif subtotal >= 50:
        return Decimal("0.05")
    return Decimal("0")


def to_cents(amount: Decimal) -> Decimal:
    """Round an amount of money to whole cents."""
    return amount.quantize(CENT)


@dataclass
class LineItem:
    """One valid order line: who bought how many bags of what, and when."""

    id: str
    date: str
    customer: str
    product: Product
    quantity: int

    def total(self) -> Decimal:
        """This line's price after its discount, to the cent."""
        subtotal = self.product.cost(self.quantity)
        rate = discount_rate(self.quantity, subtotal)
        return to_cents(subtotal - subtotal * rate)
