import sys
import threading
import time


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
threads = [threading.Thread(target=count, args=(N,)) for _ in range(2)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(f"two threads:       {time.perf_counter() - start:.2f} s")
