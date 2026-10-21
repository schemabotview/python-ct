# roastery-etl: turns the shop's daily order files into a report.

import csv
import tracemalloc
from pathlib import Path

RAW = Path("data/raw")


def read_rows(paths):
    for path in paths:
        with path.open(newline="", encoding="utf-8") as f:
            yield from csv.DictReader(f)


def peak_kib():
    return tracemalloc.get_traced_memory()[1] // 1024


days = sorted(RAW.glob("orders-*.csv"))
rows = read_rows(days)
print(type(rows).__name__, "over", len(days), "files")
print("first:", next(rows)["order_id"])

tracemalloc.start()
valid = (row for row in read_rows(days) if row["quantity"].isdigit())
bags = sum(int(row["quantity"]) for row in valid)
print("streamed:", bags, "bags, peak", peak_kib(), "KiB")
tracemalloc.reset_peak()
everything = list(read_rows(days))
print("as a list:", len(everything), "rows, peak", peak_kib(), "KiB")
