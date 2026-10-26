"""Peak memory: every row of N months in a list, or one row at a time."""

import tracemalloc
from pathlib import Path

from pipeline.extract import CsvDays

MONTH = CsvDays(Path("data/raw"))


def months(n):
    """The October rows, n times over: a stand-in for n months."""
    for _ in range(n):
        yield from MONTH.rows()


def count(rows):
    return sum(1 for _ in rows)


def peak_kib(work, rows):
    """The most memory work(rows) had allocated at any one moment."""
    tracemalloc.start()
    work(rows)
    peak = tracemalloc.get_traced_memory()[1]
    tracemalloc.stop()
    return peak / 1024


print(f"{'months':>6}  {'as a list':>10}  {'streamed':>10}")
for n in (1, 3, 12):
    kept = peak_kib(list, months(n))
    streamed = peak_kib(count, months(n))
    print(f"{n:>6}  {kept:>7,.0f} KiB  {streamed:>6,.0f} KiB")
