# roastery-etl: turns the shop's daily order files into a report.

from decimal import Decimal

row = {"type": "refund", "order": "ORD-0998", "amount": Decimal("9.95")}

match row:
    case {"type": "sale", "sku": str(sku), "quantity": int(qty)} if qty > 0:
        print("sale:", qty, "x", sku)
    case {"type": "refund", "order": order_id, "amount": amount}:
        print("refund:", amount, "against", order_id)
    case {"type": kind}:
        print("unknown row type:", kind)
    case _:
        print("not a row at all:", row)
