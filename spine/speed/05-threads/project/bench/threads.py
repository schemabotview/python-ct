"""CPU work on 1 thread and on 4: does the GIL let them run at once?"""

import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from pipeline.extract import CsvDays
from pipeline.transform import summarise
from pipeline.validate import Orders

MONTH = CsvDays(Path("data/raw"))
JOBS = 200


def price_the_month(_):
    """Read and price October from scratch: no data shared between jobs."""
    return summarise(Orders.from_rows(MONTH.rows()))["total"]


print("GIL enabled:", sys._is_gil_enabled())
for workers in (1, 4):
    start = time.perf_counter()
    with ThreadPoolExecutor(workers) as pool:
        totals = set(pool.map(price_the_month, range(JOBS)))
    seconds = time.perf_counter() - start
    print(f"{workers} thread(s): {seconds:.2f}s, every total {totals.pop()}")
