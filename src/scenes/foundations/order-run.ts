import type { Scene } from '@graphlearning/flow'

// §5 — the order-total program and one run of it. The program is the content; the terminal card
// shows the input the person typed (3) and the output that came back.
export const orderRun: Scene = {
  id: 'order-run',
  title: 'The order-total program and its run',
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
  ],
  edges: [{ source: 'program', target: 'terminal', label: 'python order.py' }],
}
