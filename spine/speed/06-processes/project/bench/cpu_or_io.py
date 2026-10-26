"""Where does the time go? Wall-clock time against CPU time."""

import time
from pathlib import Path

from pipeline.extract import CsvDays
from pipeline.transform import summarise
from pipeline.validate import Orders

ROWS = list(CsvDays(Path("data/raw")).rows())


def price_the_month(times):
    for _ in range(times):
        summarise(Orders.from_rows(ROWS))


def wait_for_the_network(seconds):
    time.sleep(seconds)


for name, work in [
    ("price the month x50", lambda: price_the_month(50)),
    ("wait on a network", lambda: wait_for_the_network(0.5)),
]:
    wall, cpu = time.perf_counter(), time.process_time()
    work()
    wall, cpu = time.perf_counter() - wall, time.process_time() - cpu
    kind = "CPU-bound" if cpu > wall / 2 else "I/O-bound"
    print(f"{name:<20} wall {wall:.2f}s  cpu {cpu:.2f}s  {kind}")
