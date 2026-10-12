import type { Scene } from '@graphlearning/flow'

// §5 — the order-total program, one run of it, and the same program with the conversion removed.
// The program is the content; the terminal card shows the input typed (3) and the output returned,
// and the last card is the failure the section exists to explain.
export const orderRun: Scene = {
  id: 'order-run',
  title: 'The order-total program, its run, and a missing conversion',
  flow: 'TB',
  nodes: [
    {
      id: 'program',
      kind: 'code',
      filename: 'order.py',
      label: `text = input("Quantity: ")
quantity = int(text)
price = 4.5
total = price * quantity
print(f"Total: {total:.2f}")`,
    },
    {
      id: 'terminal',
      kind: 'code',
      filename: 'terminal',
      label: `$ python order.py
Quantity: 3
Total: 13.50`,
    },
    {
      id: 'missing',
      kind: 'code',
      filename: 'session  —  without int()',
      label: `>>> "3" * 2
'33'
>>> "3" + 1
TypeError: can only concatenate str (not "int") to str`,
    },
  ],
  edges: [
    { source: 'program', target: 'terminal', label: 'python order.py' },
    { source: 'terminal', target: 'missing', label: 'what if int() is left out?' },
  ],
}
