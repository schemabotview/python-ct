"""How long does `in` take? A list is scanned; a set is hashed."""

import timeit

print(f"{'n':>8}  {'list':>10}  {'set':>10}")
for n in (1_000, 10_000, 100_000):
    ids = [f"ORD-{i}" for i in range(n)]
    as_set = set(ids)
    missing = "ORD-MISSING"
    in_list = timeit.timeit("missing in ids", globals=globals(), number=200)
    in_set = timeit.timeit("missing in as_set", globals=globals(), number=200)
    per_list, per_set = in_list / 200 * 1e6, in_set / 200 * 1e6
    print(f"{n:>8,}  {per_list:>8.1f}us  {per_set:>8.3f}us")
