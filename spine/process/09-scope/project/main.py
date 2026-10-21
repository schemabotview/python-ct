# roastery-etl: turns the shop's daily order files into a report.

TAX = "global"


def outer():
    TAX = "enclosing"

    def inner():
        where = "local"
        return where, TAX

    return inner()


print(TAX, outer())
print(len("ORD-1001"))
len = 8  # a global named len now hides the builtin one
print(len("ORD-1002"))
