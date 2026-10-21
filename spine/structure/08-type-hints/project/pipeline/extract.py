"""Extract: read October's order files and keep the rows that can be priced."""

import csv
import json
from decimal import Decimal
from pathlib import Path

RAW = Path("data/raw")


class InvalidRow(ValueError):
    """A row that must not be priced."""


def load_catalogue():
    with (RAW / "catalogue.json").open(encoding="utf-8") as f:
        return json.load(f)


def validate(row, catalogue):
    """A clean row: its quantity an int, its price the catalogue's Decimal."""
    if row["sku"] not in catalogue:
        raise InvalidRow(f"unknown sku {row['sku']}")
    if not row["quantity"].isdigit() or int(row["quantity"]) == 0:
        raise InvalidRow(f"bad quantity {row['quantity']!r}")
    price = Decimal(catalogue[row["sku"]]["price"])
    return {**row, "quantity": int(row["quantity"]), "price": price}


def month_rows(rejected):
    """Every valid row of October, streamed; the bad ones go to rejected."""
    catalogue = load_catalogue()
    for path in sorted(RAW.glob("orders-*.csv")):
        with path.open(newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                try:
                    yield validate(row, catalogue)
                except InvalidRow as error:
                    rejected.append((path.name, row["order_id"], str(error)))


if __name__ == "__main__":
    rejected: list[tuple[str, str, str]] = []
    rows = list(month_rows(rejected))
    print(len(rows), "valid rows,", len(rejected), "rejected")
