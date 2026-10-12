import type { Scene } from '@graphlearning/flow'

// §2 — ways of passing the same two arguments, the three TypeErrors a wrong call raises, and the
// table of parameter kinds for a signature that uses both / and *.
export const argumentKinds: Scene = {
  id: 'argument-kinds',
  title: 'Positional, keyword, and restricted parameters',
  flow: 'TB',
  nodes: [
    {
      id: 'calls',
      kind: 'code',
      filename: 'calls.py',
      label: `def line_total(qty, price):
    return qty * price

line_total(3, 4.5)             # 13.5
line_total(price=4.5, qty=3)   # 13.5: keywords, any order
line_total(3, price=4.5)       # 13.5: positional first
line_total(3)                  # TypeError: missing 'price'
line_total(3, 4.5, 1)          # TypeError: takes 2, 3 given
line_total(3, qty=3)           # TypeError: multiple values`,
    },
    {
      id: 'kinds',
      kind: 'table',
      label: 'def apply(price, /, rate, *, places=2)',
      headers: ['Parameter', 'Kind', 'Callers pass it'],
      values: [
        ['price', 'positional-only', 'by position'],
        ['rate', 'ordinary', 'by position or keyword'],
        ['places', 'keyword-only', 'by keyword'],
      ],
    },
  ],
  edges: [{ source: 'calls', target: 'kinds', label: 'restricting how it is passed' }],
}
