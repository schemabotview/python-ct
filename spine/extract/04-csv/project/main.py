# roastery-etl: turns the shop's daily order files into a report.

import csv
from pathlib import Path

path = Path("data/raw/orders-2026-10-01.csv")
with path.open(newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    print(reader.fieldnames)
    rows = list(reader)

for row in rows:
    print(row["order_id"], row["customer"], repr(row["quantity"]))
print(len(rows), "rows; every value is a", type(rows[0]["quantity"]).__name__)
