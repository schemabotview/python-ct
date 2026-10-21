"""Fetch October's 31 files from the shop: one at a time, then together."""

import asyncio
import time

from pipeline.extract import RAW


async def fetch(path):
    await asyncio.sleep(0.1)  # the shop's server takes a tenth of a second
    return path.read_text(encoding="utf-8")


async def one_at_a_time(paths):
    return [await fetch(path) for path in paths]


async def all_together(paths):
    async with asyncio.TaskGroup() as group:
        tasks = [group.create_task(fetch(path)) for path in paths]
    return [task.result() for task in tasks]


paths = sorted(RAW.glob("orders-*.csv"))
for run in (one_at_a_time, all_together):
    start = time.perf_counter()
    texts = asyncio.run(run(paths))
    took = time.perf_counter() - start
    print(f"{run.__name__:14} {len(texts)} files in {took:.2f} s")
