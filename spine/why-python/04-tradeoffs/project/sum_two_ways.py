import timeit

nums = list(range(1_000_000))


def loop_sum():
    total = 0
    for n in nums:
        total += n
    return total


print(loop_sum() == sum(nums))
loop = min(timeit.repeat(loop_sum, number=10, repeat=5)) / 10
builtin = min(timeit.repeat(lambda: sum(nums), number=10, repeat=5)) / 10
print(f"for loop: {loop * 1000:.1f} ms")
print(f"sum():    {builtin * 1000:.1f} ms")
print(f"sum() is {loop / builtin:.1f}x faster here")
