"""Summarise October's 31 files in separate processes."""

import csv
import os
import time
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

from bench.bound import summarise_day
from pipeline.extract import RAW, load_catalogue, validate
from pipeline.transform import priced, summarise


def summarise_file(path: Path) -> dict:
    catalogue = load_catalogue()
    rows = []
    with path.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            try:
                rows.append(validate(row, catalogue))
            except ValueError:
                pass  # counted and reported by the real pipeline
    return summarise(priced(rows))


def heavy_day(_):
    return summarise_day()  # bench.bound's pure computation


def compare(label, work, jobs):
    start = time.perf_counter()
    one = list(map(work, jobs))
    middle = time.perf_counter()
    with ProcessPoolExecutor() as pool:
        many = list(pool.map(work, jobs))
    end = time.perf_counter()
    same = "same results" if one == many else "DIFFERENT results"
    print(f"{label}: 1 process {middle - start:.2f} s, "
          f"pool {end - middle:.2f} s, {same}")


if __name__ == "__main__":
    print(os.process_cpu_count(), "CPUs")
    compare("31 small files", summarise_file, sorted(RAW.glob("orders-*.csv")))
    compare("8 heavy days  ", heavy_day, range(8))
