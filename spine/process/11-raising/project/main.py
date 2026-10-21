# roastery-etl: turns the shop's daily order files into a report.

class InvalidOrder(ValueError):
    """An order row that must not be priced."""


def validate(row):
    if int(row["quantity"]) <= 0:
        raise InvalidOrder(f"{row['id']}: quantity must be positive")


rows = [{"id": "ORD-1001", "sku": "ETH-250", "quantity": "3"},
        {"id": "ORD-1008", "sku": "COL-500", "quantity": "-2"}]
for row in rows:
    try:
        validate(row)
    except InvalidOrder as error:
        print("rejected:", error)
validate({"id": "ORD-1007", "sku": "ETH-250", "quantity": "0"})
