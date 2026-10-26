"""Validate: a CSV row becomes a clean order line, or InvalidOrder says why."""

import json
from collections.abc import Iterable, Iterator
from decimal import Decimal
from pathlib import Path

from .model import LineItem, Money, Product

MISSING = sentinel("MISSING")

type Row = dict[str, str]


def read_catalogue(path: Path) -> frozendict[str, Product]:
    """Product code -> Product, from catalogue.json; prices become Money."""
    data = json.loads(path.read_text(encoding="utf-8"))
    return frozendict({
        sku: Product(sku, item["name"], Money(Decimal(item["price"])))
        for sku, item in data.items()
    })


CATALOGUE = read_catalogue(Path("data/raw/catalogue.json"))


class InvalidOrder(Exception):
    """A line the pipeline refuses to price, and why."""


def parse_row(row: Row) -> LineItem:
    """A LineItem from a CSV row, or InvalidOrder saying why not."""
    for field in ("id", "customer", "sku", "quantity"):
        value = row.get(field, MISSING)
        if value is MISSING:
            raise InvalidOrder(f"the file has no {field} column")
        if not value:
            raise InvalidOrder(f"{row['id']}: no {field}")
    if not row["quantity"].isdigit():
        raise InvalidOrder(f"{row['id']}: quantity {row['quantity']!r}")
    if row["sku"] not in CATALOGUE:
        raise InvalidOrder(f"{row['id']}: unknown product {row['sku']}")
    try:
        return LineItem(row["id"], row["date"], row["customer"],
                        CATALOGUE[row["sku"]], int(row["quantity"]))
    except ValueError as error:
        raise InvalidOrder(f"{row['id']}: {error}") from error


class Orders:
    """The month's valid order lines, and the rows refused on the way."""

    def __init__(self, lines: list[LineItem], rejected: list[InvalidOrder]):
        self.lines = lines
        self.rejected = rejected

    @classmethod
    def from_rows(cls, rows: Iterable[Row]) -> Orders:
        """Parse every row: valid ones become lines, the rest are refused."""
        lines, rejected = [], []
        for row in rows:
            try:
                lines.append(parse_row(row))
            except InvalidOrder as error:
                rejected.append(error)
        return cls(lines, rejected)

    def __len__(self) -> int:
        return len(self.lines)

    def __iter__(self) -> Iterator[LineItem]:
        return iter(self.lines)

    def __contains__(self, order_id: object) -> bool:
        return any(line.id == order_id for line in self.lines)
