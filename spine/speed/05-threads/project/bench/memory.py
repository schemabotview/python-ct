"""Peak memory of the transform: the month held in a list, or streamed."""

import tracemalloc

from pipeline.extract import month_rows
from pipeline.transform import daily_summaries, priced


def peak_kib(work):
    tracemalloc.start()
    result = work()
    peak = tracemalloc.get_traced_memory()[1] // 1024
    tracemalloc.stop()
    return peak, result


held, a = peak_kib(lambda: daily_summaries(list(priced(month_rows([])))))
streamed, b = peak_kib(lambda: daily_summaries(priced(month_rows([]))))
print(f"the month in a list: {held:,} KiB peak")
print(f"streamed, one day:   {streamed:,} KiB peak")
print("same 31 summaries:", a == b)
