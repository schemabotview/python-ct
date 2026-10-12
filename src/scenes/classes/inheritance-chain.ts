import type { Scene } from '@graphlearning/flow'

// §6 — a subclass that overrides total() and reuses the parent's through super(), and the lookup chain
// Python walks. 10 x 4.5 = 45.0, less 10%, is 40.5.
export const inheritanceChain: Scene = {
  id: 'inheritance-chain',
  title: 'A subclass overrides, and calls super()',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'inheritance.py',
      label: `class LineItem:
    def __init__(self, item, qty, price):
        self.item, self.qty, self.price = item, qty, price
    def total(self):
        return self.qty * self.price

class BulkLineItem(LineItem):           # BulkLineItem IS a LineItem
    def total(self):                    # overrides the parent's method
        base = super().total()          # call the parent's version
        return base * 0.9 if self.qty >= 10 else base

BulkLineItem("tea", 10, 4.5).total()    # 40.5
BulkLineItem("tea", 3, 4.5).total()     # 13.5`,
    },
    {
      id: 'mro',
      label: 'Method search order',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'bulk', label: 'BulkLineItem: searched first', variant: 'chip', pattern: 'service', icon: 'filecode' },
        { id: 'parent', label: 'LineItem: then its parent', variant: 'chip', pattern: 'service', icon: 'filecode' },
        { id: 'obj', label: 'object: searched last', variant: 'chip', pattern: 'storage', icon: 'box' },
      ],
      edges: [
        { source: 'bulk', target: 'parent', label: 'then' },
        { source: 'parent', target: 'obj', label: 'then' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'mro' }],
}
