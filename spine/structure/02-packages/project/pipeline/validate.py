"""Validate: a CSV row becomes a clean order line, or InvalidOrder says why."""

import json
from decimal import Decimal
from pathlib import Path

MISSING = sentinel("MISSING")


def read_catalogue(path):
    """Product code -> price, from catalogue.json; prices become Decimal."""
    data = json.loads(path.read_text(encoding="utf-8"))
    prices = {sku: Decimal(item["price"]) for sku, item in data.items()}
    return frozendict(prices)


CATALOGUE = read_catalogue(Path("data/raw/catalogue.json"))


class InvalidOrder(Exception):
    """A line the pipeline refuses to price, and why."""


def parse_row(row):
    """A clean order line from a CSV row, or InvalidOrder saying why not."""
    for field in ("id", "customer", "sku", "quantity"):
        value = row.get(field, MISSING)
        if value is MISSING:
            raise InvalidOrder(f"the file has no {field} column")
        if not value:
            raise InvalidOrder(f"{row['id']}: no {field}")
    if not row["quantity"].isdigit() or row["quantity"] == "0":
        raise InvalidOrder(f"{row['id']}: quantity {row['quantity']!r}")
    if row["sku"] not in CATALOGUE:
        raise InvalidOrder(f"{row['id']}: unknown product {row['sku']}")
    return {**row, "quantity": int(row["quantity"])}
