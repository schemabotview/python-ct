# roastery-etl: turns the shop's daily order files into a report.

path = "data/raw/orders-2026-10-02.csv"

with open(path, "rb") as f:
    raw = f.read()
print(type(raw).__name__, "of length", len(raw))
print(raw.splitlines()[-1])
try:
    raw.decode("utf-8")
except UnicodeDecodeError as error:
    print("not UTF-8: byte", hex(raw[error.start]), "at", error.start)

text = raw.decode("cp1252")
print(type(text).__name__, "of length", len(text))
print(text.splitlines()[-1])
with open(path, "w", encoding="utf-8") as f:
    f.write(text)
with open(path, "rb") as f:
    print(f.read().splitlines()[-1])
