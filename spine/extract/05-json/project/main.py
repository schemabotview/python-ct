# roastery-etl: turns the shop's daily order files into a report.

import json
from decimal import Decimal
from pathlib import Path

path = Path("data/raw/catalogue.json")
with path.open(encoding="utf-8") as f:
    catalogue = json.load(f)

print(type(catalogue).__name__, len(catalogue), list(catalogue))
print(catalogue["ETH-250"])
price = Decimal(catalogue["ETH-250"]["price"])
print(price * 3)
print(json.loads('{"price": 9.95}')["price"] * 3)
print(json.loads('{"price": 9.95}', parse_float=Decimal)["price"] * 3)
