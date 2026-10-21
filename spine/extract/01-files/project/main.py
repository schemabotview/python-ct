# roastery-etl: turns the shop's daily order files into a report.

path = "data/raw/orders-2026-10-01.csv"

with open(path, encoding="utf-8") as f:
    header = f.readline()
    print(repr(header))
    for line in f:
        print(line.rstrip("\n"))
print(f.closed)
