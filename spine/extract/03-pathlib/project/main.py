# roastery-etl: turns the shop's daily order files into a report.

from pathlib import Path

RAW = Path("data/raw")

print(RAW.exists(), RAW.is_dir())
days = sorted(RAW.glob("orders-*.csv"))
for path in days:
    print(path.name, path.stat().st_size, "bytes")
first = days[0]
print(first.stem, first.suffix, first.parent)
print(first.stem.removeprefix("orders-"))
print(RAW / "catalogue.json")
print(Path.cwd())
