import type { Scene } from '@graphlearning/flow'

// §3 — a for loop, the table of loop state it produces pass by pass, and the three iteration helpers.
export const forTrace: Scene = {
  id: 'for-trace',
  title: 'A for loop, pass by pass',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      filename: 'total.py',
      label: `prices = [4.5, 8.0, 2.25]
total = 0
for price in prices:
    total = total + price      # total is 14.75 at the end`,
    },
    {
      id: 'state',
      kind: 'table',
      label: 'Loop state after each pass',
      headers: ['pass', 'price', 'total'],
      values: [
        ['1', '4.5', '4.5'],
        ['2', '8.0', '12.5'],
        ['3', '2.25', '14.75'],
      ],
    },
    {
      id: 'helpers',
      kind: 'code',
      filename: 'helpers.py',
      label: `list(range(1, 6, 2))                # [1, 3, 5]
list(enumerate(["tea", "mug"], 1))  # [(1, 'tea'), (2, 'mug')]
list(zip(["tea", "mug"], [3, 1]))   # [('tea', 3), ('mug', 1)]`,
    },
  ],
  edges: [
    { source: 'loop', target: 'state' },
    { source: 'state', target: 'helpers', label: 'range, enumerate, zip' },
  ],
}
