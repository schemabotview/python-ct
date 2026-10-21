# roastery-etl: turns the shop's daily order files into a report.

import csv
import json
from pathlib import Path

RAW = Path("data/raw")


class InvalidRow(ValueError):
    """A row that must not be priced."""


def validate(row, catalogue):
    if row["sku"] not in catalogue:
        raise InvalidRow(f"unknown sku {row['sku']}")
    if not row["quantity"].isdigit() or int(row["quantity"]) == 0:
        raise InvalidRow(f"bad quantity {row['quantity']!r}")
    return {**row, "quantity": int(row["quantity"])}


with (RAW / "catalogue.json").open(encoding="utf-8") as f:
    catalogue = json.load(f)
good, bad = [], []
with (RAW / "orders-2026-10-01.csv").open(newline="", encoding="utf-8") as f:
    for line_no, row in enumerate(csv.DictReader(f), start=2):
        try:
            good.append(validate(row, catalogue))
        except InvalidRow as error:
            bad.append((line_no, row["order_id"], str(error)))
print(len(good), "good rows,", len(bad), "rejected")
for line_no, order_id, reason in bad:
    print(f"  line {line_no}: {order_id}: {reason}")
