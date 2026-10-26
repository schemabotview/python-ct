# A million numbers, added two ways: a Python loop, and the built-in sum().
import timeit

SETUP = "numbers = list(range(1_000_000))"
LOOP = """
total = 0
for n in numbers:
    total += n
"""
BUILTIN = "total = sum(numbers)"

loop = min(timeit.repeat(LOOP, SETUP, number=10, repeat=5)) / 10
builtin = min(timeit.repeat(BUILTIN, SETUP, number=10, repeat=5)) / 10
print(f"a Python loop: {loop * 1000:5.1f} ms")
print(f"sum():         {builtin * 1000:5.1f} ms")
print(f"sum() is {loop / builtin:.1f} times faster")
