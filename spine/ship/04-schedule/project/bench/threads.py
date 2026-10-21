"""The same thread pool, on waiting and on computing."""

import sys
import time
from concurrent.futures import ThreadPoolExecutor

from bench.bound import fetch_day, summarise_day


def timed_pool(work, jobs, workers):
    start = time.perf_counter()
    with ThreadPoolExecutor(max_workers=workers) as pool:
        for _ in range(jobs):
            pool.submit(work)
    return time.perf_counter() - start


print("GIL enabled:", sys._is_gil_enabled())
for work in (fetch_day, summarise_day):
    one, four = timed_pool(work, 4, 1), timed_pool(work, 4, 4)
    print(f"{work.__name__:14} 1 thread {one:.2f} s   4 threads {four:.2f} s")
