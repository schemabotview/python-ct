# roastery-etl: turns the shop's daily order files into a report.

yesterday = {"maya", "omar", "lena"}
today_orders = ["maya", "raj", "maya", "lena", "raj", "raj"]

today = set(today_orders)
print(len(today_orders), len(today))
print("omar" in today, "raj" in today)
print(sorted(today & yesterday))
print(sorted(today - yesterday))
print(sorted(today | yesterday))
print(type({}), type(set()))
