"""CPU-bound or I/O-bound? Compare wall time with CPU time."""

import time


def fetch_day():
    time.sleep(0.2)  # stands in for waiting on the shop's server


def summarise_day():
    return sum(i * i for i in range(2_000_000))  # pure computation


if __name__ == "__main__":
    for work in (fetch_day, summarise_day):
        wall, cpu = time.perf_counter(), time.process_time()
        work()
        wall, cpu = time.perf_counter() - wall, time.process_time() - cpu
        print(f"{work.__name__:14} wall {wall:.2f} s   cpu {cpu:.2f} s")
