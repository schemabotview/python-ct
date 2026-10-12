import type { Scene } from '@graphlearning/flow'

// §5 — the sample file, then parsing it with csv.DictReader and moving values through json. The
// strings-everywhere result and the tuple-to-list and set failures are the lessons.
export const csvJson: Scene = {
  id: 'csv-json',
  title: 'CSV rows are strings; JSON has limits',
  flow: 'TB',
  nodes: [
    {
      id: 'file',
      kind: 'code',
      filename: 'orders.csv',
      label: `id,item,qty,price
A-1001,tea,3,4.5
A-1002,mug,1,8.0`,
    },
    {
      id: 'parse',
      kind: 'code',
      filename: 'parse.py',
      label: `import csv, json
with open("orders.csv", newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
rows[0]     # {'id': 'A-1001', 'item': 'tea', 'qty': '3', 'price': '4.5'}
json.loads('{"qty": 3, "coupon": null}')   # {'qty': 3, 'coupon': None}
json.loads(json.dumps({"t": (1, 2)}))      # {'t': [1, 2]}: a list now
json.dumps({1, 2})                         # TypeError: set not serializable`,
    },
  ],
  edges: [{ source: 'file', target: 'parse', label: 'parse, then convert' }],
}
