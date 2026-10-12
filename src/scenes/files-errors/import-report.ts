import type { Scene } from '@graphlearning/flow'

// §10 — the whole import-to-report flow and the output it produced on a five-row file: two valid rows,
// three rejected for three different reasons. A short row yields None, hence the TypeError.
export const importReport: Scene = {
  id: 'import-report',
  title: 'Import, validate, report',
  flow: 'TB',
  nodes: [
    {
      id: 'program',
      kind: 'code',
      filename: 'report.py',
      label: `import csv
from decimal import Decimal, InvalidOperation
good, rejected = [], []
with open("orders.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        try:
            qty = int(row["qty"])
            price = Decimal(row["price"])
        except (ValueError, TypeError, InvalidOperation) as err:
            rejected.append((row["id"], type(err).__name__))
        else:
            good.append((row["id"], qty * price))
total = sum(amount for _, amount in good)
print(f"Valid: {len(good)}  Rejected: {len(rejected)}  Total: {total:.2f}")
for order_id, reason in rejected:
    print("rejected", order_id, reason)`,
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `Valid: 2  Rejected: 3  Total: 18.00
rejected A-1002 ValueError
rejected A-1003 TypeError
rejected A-1004 InvalidOperation`,
    },
  ],
  edges: [{ source: 'program', target: 'output', label: 'python report.py' }],
}
