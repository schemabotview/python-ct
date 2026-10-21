# roastery-etl: turns the shop's daily order files into a report.

queue = ["ORD-1001,ETH-250,3", "ORD-1002,COL-500,0", "ORD-1003,KEN-1000,1",
         "END", "ORD-9999,ETH-250,1"]
processed = 0
while queue:
    row = queue.pop(0)
    if row == "END":
        print("trailer reached;", len(queue), "row(s) after it ignored")
        break
    order_id, sku, quantity = row.split(",")
    if int(quantity) == 0:
        print(order_id, "skipped: quantity 0")
        continue
    processed += 1
    print(order_id, "->", quantity, "x", sku)
print("processed", processed)
