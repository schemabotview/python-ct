"""The roastery's domain: the things the pipeline is about."""

from dataclasses import dataclass
from decimal import Decimal

CENT = Decimal("0.01")


@dataclass(frozen=True)
class Money:
    """An exact amount in whole cents: a value, never changed in place."""

    amount: Decimal = Decimal("0.00")

    def __add__(self, other: Money) -> Money:
        return Money(self.amount + other.amount)

    def __mul__(self, factor: int | Decimal) -> Money:
        """Times a quantity or a rate, rounded to the cent."""
        return Money((self.amount * factor).quantize(CENT))

    def __str__(self) -> str:
        return str(self.amount)

    @property
    def cents(self) -> int:
        return int(self.amount * 100)


@dataclass
class Product:
    """A coffee the roastery sells: its code, its name and its price."""

    sku: str
    name: str
    price: Money

    def cost(self, quantity: int) -> Money:
        """The price of this many bags, before any discount."""
        return self.price * quantity


def discount_rate(quantity: int, subtotal: Money) -> Decimal:
    """15% off 10+ bags of one coffee; else 5% off a line of 50.00 or more."""
    if quantity >= 10:
        return Decimal("0.15")
    elif subtotal.amount >= 50:
        return Decimal("0.05")
    return Decimal("0")


@dataclass
class LineItem:
    """One valid order line: who bought how many bags of what, and when."""

    id: str
    date: str
    customer: str
    product: Product
    quantity: int

    def __post_init__(self) -> None:
        """Refuse a line that cannot exist: no one buys zero bags."""
        if self.quantity < 1:
            raise ValueError(f"quantity must be 1 or more, got {self.quantity}")

    @property
    def subtotal(self) -> Money:
        """The bags at the catalogue price, before any discount."""
        return self.product.cost(self.quantity)

    @property
    def total(self) -> Money:
        """This line's price after its discount, to the cent."""
        rate = discount_rate(self.quantity, self.subtotal)
        return self.subtotal * (1 - rate)
