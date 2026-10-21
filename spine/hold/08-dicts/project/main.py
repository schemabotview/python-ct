# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

catalogue = {
    "ETH-250": Decimal("9.95"),
    "COL-500": Decimal("17.50"),
    "KEN-1000": Decimal("31.00"),
}
order = {"id": "ORD-1001", "sku": "ETH-250", "quantity": 3}

price = catalogue[order["sku"]]
print(price, price * order["quantity"])
print(len(catalogue), "COL-500" in catalogue, catalogue.get("BRA-500"))
catalogue["BRA-500"] = Decimal("16.25")
print(list(catalogue))
print(catalogue["PER-250"])
