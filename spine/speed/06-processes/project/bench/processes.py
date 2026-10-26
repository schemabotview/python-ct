"""Processes sidestep the GIL: each has its own interpreter."""

import time
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

from pipeline.extract import CsvDays, iter_rows
from pipeline.transform import summarise
from pipeline.validate import Orders

RAW = Path("data/raw")


def price_the_month(_):
    """Read and price October from scratch, as in bench/threads.py."""
    return summarise(Orders.from_rows(CsvDays(RAW).rows()))["total"]


def price_one_file(path):
    return len(Orders.from_rows(iter_rows([path])))


def timed(label, work):
    start = time.perf_counter()
    result = work()
    print(f"{label:<30} {time.perf_counter() - start:.2f}s  {result}")


if __name__ == "__main__":
    paths = sorted(RAW.glob("orders-*.csv"))
    with ProcessPoolExecutor(4) as pool:
        timed("31 files, one process", lambda: sum(map(price_one_file, paths)))
        timed(
            "31 files, 4 processes",
            lambda: sum(pool.map(price_one_file, paths)),
        )
        timed(
            "the month x200, one process",
            lambda: len(set(map(price_the_month, range(200)))),
        )
        timed(
            "the month x200, 4 processes",
            lambda: len(set(pool.map(price_the_month, range(200)))),
        )
