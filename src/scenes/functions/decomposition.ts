import type { Scene } from '@graphlearning/flow'

// §9 — a function passed as a value (to sorted and to a function of our own), and the four small
// functions the reporting program is decomposed into, each named for its one job.
export const decomposition: Scene = {
  id: 'decomposition',
  title: 'Small functions, passed around as values',
  flow: 'TB',
  nodes: [
    {
      id: 'callbacks',
      kind: 'code',
      filename: 'callbacks.py',
      label: `def line_total(line):
    item, qty, price = line
    return qty * price
sorted(sales, key=line_total)    # pass the function itself, no ()

def apply_all(values, fn):
    return [fn(v) for v in values]
def tax(price):
    return price * 1.5
apply_all([10, 20], tax)         # [15.0, 30.0]`,
    },
    {
      id: 'parts',
      label: 'The reporting program, one job per function',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'parse', label: 'parse_line: text to a tuple', variant: 'chip', pattern: 'service', icon: 'scissors' },
        { id: 'price', label: "line_total: one line's cost", variant: 'chip', pattern: 'service', icon: 'sigma' },
        { id: 'sum', label: 'order_total: sum of the lines', variant: 'chip', pattern: 'service', icon: 'barchart' },
        { id: 'report', label: 'format_report: text for screen', variant: 'chip', pattern: 'external', icon: 'monitor' },
      ],
    },
  ],
  edges: [{ source: 'callbacks', target: 'parts' }],
}
