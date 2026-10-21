import sys
import time
from concurrent.futures import ThreadPoolExecutor


def count(n):
    while n:
        n -= 1


N = 20_000_000
print("GIL enabled:", sys._is_gil_enabled())

start = time.perf_counter()
count(N)
count(N)
print(f"one after another: {time.perf_counter() - start:.2f} s")

start = time.perf_counter()
with ThreadPoolExecutor(max_workers=2) as pool:
    pool.map(count, [N, N])
print(f"two threads:       {time.perf_counter() - start:.2f} s")
