# The same rule, written twice: 10% off an order of three bags or more.


def total_clever(b, p): return b * p * (.9 if b >= 3 else 1)


def total_readable(bags, price):
    """What an order costs, with 10% off at three bags or more."""
    total = bags * price
    if bags >= 3:
        total = total * 0.9
    return total


print(total_clever(3, 10), total_readable(3, 10))
