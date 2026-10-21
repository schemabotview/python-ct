# roastery-etl: turns the shop's daily order files into a report.

skus = ["ETH-250", "COL-500", "ETH-250", "KEN-1000"]
quantities = [3, 1, 2, 1]

skus.append("BRA-500")
quantities.append(4)
print(len(skus), skus[0], skus[-1])
print(skus[1:3])
print("COL-500" in skus, skus.count("ETH-250"), sum(quantities))
print(skus[5])
