import type { Scene } from '@graphlearning/flow'

// §7 — three small algorithms on the same sales data: accumulate into a dictionary, track the best
// so far (together in one card), and a filtering loop beside the comprehension that replaces it.
export const loopAlgorithms: Scene = {
  id: 'loop-algorithms',
  title: 'Small algorithms from loops',
  flow: 'TB',
  nodes: [
    {
      id: 'aggregate',
      kind: 'code',
      filename: 'algorithms.py',
      label: `sales = [("tea", 3, 4.5), ("mug", 1, 8.0), ("tea", 2, 4.5)]
totals = {}
for item, qty, price in sales:
    totals[item] = totals.get(item, 0) + qty * price
# totals is {'tea': 22.5, 'mug': 8.0}

best = sales[0]
for line in sales:
    if line[1] * line[2] > best[1] * best[2]:
        best = line
# best is ('tea', 3, 4.5)`,
    },
    {
      id: 'filter',
      kind: 'code',
      filename: 'filter.py',
      label: `big = []
for item, qty, price in sales:
    if qty > 1:
        big.append(item)           # ['tea', 'tea']

[item for item, qty, price in sales if qty > 1]   # the same`,
    },
  ],
  edges: [{ source: 'aggregate', target: 'filter', label: 'loop, then comprehension' }],
}
