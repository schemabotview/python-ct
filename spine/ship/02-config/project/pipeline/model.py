"""The roastery's domain: the things the pipeline is about."""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from decimal import Decimal

CENT = Decimal("0.01")


@dataclass(frozen=True)
class Money:
    """An exact amount in whole cents: a value, never changed in place."""

    amount: Decimal = Decimal("0.00")

    def __post_init__(self) -> None:
        """Hold the promise: always whole cents, however it was made."""
        object.__setattr__(self, "amount", self.amount.quantize(CENT))

    def __add__(self, other: Money) -> Money:
        return Money(self.amount + other.amount)

    def __mul__(self, factor: int | Decimal) -> Money:
        """Times a quantity or a rate (rounded, like every Money)."""
        return Money(self.amount * factor)

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


class DiscountRule(ABC):
    """A discount: whether it applies to a line, and its rate."""

    rate = Decimal(0)

    @abstractmethod
    def applies(self, line: LineItem) -> bool:
        """True when this rule prices the line."""


class Bulk(DiscountRule):
    """15% off 10 or more bags of one coffee."""

    rate = Decimal("0.15")

    def applies(self, line: LineItem) -> bool:
        return line.quantity >= 10


class Wholesale(DiscountRule):
    """5% off a line of 50.00 or more."""

    rate = Decimal("0.05")

    def applies(self, line: LineItem) -> bool:
        return line.subtotal.amount >= 50


class NoDiscount(DiscountRule):
    """Everything else pays the catalogue price."""

    def applies(self, line: LineItem) -> bool:
        return True


RULES = (Bulk(), Wholesale(), NoDiscount())


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
            raise ValueError(
                f"quantity must be 1 or more, got {self.quantity}"
            )

    @property
    def subtotal(self) -> Money:
        """The bags at the catalogue price, before any discount."""
        return self.product.cost(self.quantity)

    @property
    def rule(self) -> DiscountRule:
        """The first rule that applies: RULES is in priority order."""
        return next(rule for rule in RULES if rule.applies(self))

    @property
    def total(self) -> Money:
        """This line's price after its discount, to the cent."""
        return self.subtotal * (1 - self.rule.rate)
