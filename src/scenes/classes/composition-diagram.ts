import type { Scene } from '@graphlearning/flow'

// §5 — an Order that holds LineItems, and the same relationship drawn as a has-a diagram with what each
// object returns. 3 x 4.5 + 1 x 8.0 = 21.5.
export const compositionDiagram: Scene = {
  id: 'composition-diagram',
  title: 'An Order has LineItems',
  flow: 'TB',
  nodes: [
    {
      id: 'order',
      kind: 'code',
      filename: 'order.py',
      label: `class Order:
    def __init__(self, order_id):
        self.id = order_id
        self.lines = []                  # an Order HAS lines
    def add(self, line):
        self.lines.append(line)
    def total(self):
        return sum(line.total() for line in self.lines)
order = Order("A-1001")
order.add(LineItem("tea", 3, 4.5))
order.add(LineItem("mug", 1, 8.0))
order.total()                            # 21.5`,
    },
    {
      id: 'has-a',
      label: 'Who asks whom',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'o', label: 'Order A-1001: total() is 21.5', variant: 'chip', pattern: 'service', icon: 'package' },
        { id: 'l1', label: 'LineItem tea: total() is 13.5', variant: 'chip', pattern: 'storage', icon: 'box' },
        { id: 'l2', label: 'LineItem mug: total() is 8.0', variant: 'chip', pattern: 'storage', icon: 'box' },
      ],
      edges: [
        { source: 'o', target: 'l1', label: 'asks' },
        { source: 'o', target: 'l2', label: 'asks' },
      ],
    },
  ],
  edges: [{ source: 'order', target: 'has-a' }],
}
