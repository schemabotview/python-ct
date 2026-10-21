"""Extract: read a month's order files and keep the rows that can be priced."""

import csv
import json
from datetime import date, timedelta
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


def month_rows(rejected, month="2026-10"):
    """Every valid row of the month, streamed; the bad ones go to rejected."""
    catalogue = load_catalogue()
    for path in sorted(RAW.glob(f"orders-{month}-*.csv")):
        with path.open(newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                try:
                    yield validate(row, catalogue)
                except InvalidRow as error:
                    rejected.append((path.name, row["order_id"], str(error)))


def month_to_process(today: date | None = None) -> str:
    """The month before today's, as "YYYY-MM": the job runs early each month."""
    today = today or date.today()
    last_month = today.replace(day=1) - timedelta(days=1)
    return last_month.strftime("%Y-%m")


if __name__ == "__main__":
    rejected: list[tuple[str, str, str]] = []
    rows = list(month_rows(rejected))
    print(len(rows), "valid rows,", len(rejected), "rejected")
