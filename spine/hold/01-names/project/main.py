# roastery-etl: turns the shop's daily order files into a report.

sku = "ETH-250"
quantity = 2
price = 9.95
print(sku, quantity, price)
print(type(sku), type(quantity), type(price))

bag_price = price
print(bag_price is price)
price = 10.95
print(bag_price, price)
