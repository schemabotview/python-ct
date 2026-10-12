import type { Scene } from '@graphlearning/flow'

// §4 — a while loop that terminates and, in the same card, the same shape with the progress step
// removed; below it the first loop's trace, including the final failed test.
export const whileTrace: Scene = {
  id: 'while-trace',
  title: 'A while loop, and one that never ends',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      filename: 'while.py',
      label: `stock = 100
filled = 0
while stock >= 30:
    stock = stock - 30
    filled = filled + 1   # filled is 3, stock is 10 afterwards

n = 5
while n > 0:
    print(n)              # nothing changes n: it never ends`,
    },
    {
      id: 'trace',
      kind: 'table',
      label: 'The test is checked before every pass',
      headers: ['pass', 'stock tested', 'stock >= 30', 'stock after'],
      values: [
        ['1', '100', 'True', '70'],
        ['2', '70', 'True', '40'],
        ['3', '40', 'True', '10'],
        ['4', '10', 'False', 'loop ends'],
      ],
    },
  ],
  edges: [{ source: 'loop', target: 'trace', label: 'trace the first loop' }],
}
