from pipeline.extract import load_catalogue, validate

catalogue = load_catalogue()
row = {"order_id": "ORD-1004", "sku": "ETH-250", "quantity": "three"}
breakpoint()
print(validate(row, catalogue))
