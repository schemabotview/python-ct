import type { Scene } from '@graphlearning/flow'

// §7 — unpacking and nested access on the order data, then the four record shapes side by side.
export const unpackNested: Scene = {
  id: 'unpack-nested',
  title: 'Unpacking and nested records',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'unpacking.py',
      label: `oid, item, qty = ("A-1001", "tea", 3)
first, *rest = [10, 20, 30]   # 10 and [20, 30]
x, y = 1, 2
x, y = y, x                   # swapped: x is 2, y is 1

orders = [
    {"id": "A-1001", "lines": [("tea", 3, 4.5), ("mug", 1, 8.0)]},
    {"id": "A-1002", "lines": [("jar", 2, 2.25)]},
]
orders[0]["lines"][1][0]      # 'mug'`,
    },
    {
      id: 'shapes',
      kind: 'table',
      label: 'Four record shapes',
      headers: ['Shape', 'Example', 'Read one field'],
      values: [
        ['tuple', '("tea", 3, 4.5)', 'line[1]'],
        ['dictionary', '{"item": "tea", "qty": 3}', 'rec["qty"]'],
        ['list of records', '[rec1, rec2]', 'recs[0]["qty"]'],
        ['dict of lists', '{"tea": [3, 2]}', 'qtys["tea"][0]'],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'shapes', label: 'which shape fits?' }],
}
