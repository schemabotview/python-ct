"""The pipeline's data as types, not dicts."""


class Order:
    """One order from the shop's daily file."""

    def __init__(self, id, date, customer, sku, quantity):
        self.id = id
        self.date = date
        self.customer = customer
        self.sku = sku
        self.quantity = quantity

    def is_wholesale(self):
        return self.quantity >= 10
