import type { Scene } from '@graphlearning/flow'

// §3 — the three kinds of method on one class, and what each call is rewritten to. The table is the
// "what Python actually runs" translation that makes self and cls stop being magic.
export const methodKinds: Scene = {
  id: 'method-kinds',
  title: 'Instance, class, and static methods',
  flow: 'TB',
  nodes: [
    {
      id: 'methods',
      kind: 'code',
      filename: 'methods.py',
      label: `class LineItem:
    def __init__(self, item, qty, price):
        self.item, self.qty, self.price = item, qty, price
    def total(self):                    # instance method: gets self
        return self.qty * self.price
    @classmethod
    def from_text(cls, text):           # class method: gets cls
        item, qty, price = text.split(",")
        return cls(item, int(qty), float(price))
    @staticmethod
    def is_valid_qty(qty):              # static method: gets neither
        return qty > 0

line = LineItem.from_text("tea,3,4.5")  # line.total() is 13.5`,
    },
    {
      id: 'rewrite',
      kind: 'table',
      label: 'What Python runs',
      headers: ['You write', 'Python runs'],
      values: [
        ['line.total()', 'LineItem.total(line)'],
        ['LineItem.from_text(t)', 'from_text(LineItem, t)'],
        ['LineItem.is_valid_qty(3)', 'is_valid_qty(3)'],
      ],
    },
  ],
  edges: [{ source: 'methods', target: 'rewrite', label: 'self and cls explained' }],
}
