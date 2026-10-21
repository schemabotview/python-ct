# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

catalogue = {
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
    "KEN-1000": Decimal("31.00"),
}
rows = [
    {"id": "ORD-1001", "sku": "ETH-250", "quantity": "3"},
    {"id": "ORD-1005", "sku": "PER-250", "quantity": "1"},
    {"id": "ORD-1006", "sku": "COL-500", "quantity": "two"},
    {"id": "ORD-1003", "sku": "KEN-1000", "quantity": "2"},
]

good, bad = [], []
for row in rows:
    try:
        total = catalogue[row["sku"]] * int(row["quantity"])
    except KeyError as error:
        bad.append((row["id"], f"unknown sku {error}"))
    except ValueError as error:
        bad.append((row["id"], str(error)))
    else:
        good.append((row["id"], total))
print("priced:", good)
for order_id, reason in bad:
    print("rejected", order_id, reason)
