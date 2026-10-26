"""The roastery's domain: the things the pipeline is about."""

from decimal import Decimal


class Product:
    """A coffee the roastery sells: its code, its name and its price."""

    def __init__(self, sku: str, name: str, price: Decimal) -> None:
        self.sku = sku
        self.name = name
        self.price = price

    def cost(self, quantity: int) -> Decimal:
        """The price of this many bags, before any discount."""
        return self.price * quantity
