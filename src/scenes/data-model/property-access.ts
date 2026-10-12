import type { Scene } from '@graphlearning/flow'

// §8 — the Chapter 7 invariant, now enforced on every assignment through a property, plus a computed
// attribute; the table shows what each kind of access runs. The stored value lives under _qty.
export const propertyAccess: Scene = {
  id: 'property-access',
  title: 'A property runs code on access',
  flow: 'TB',
  nodes: [
    {
      id: 'prop',
      kind: 'code',
      filename: 'properties.py',
      label: `class LineItem:
    def __init__(self, item, qty, price):
        self.item, self.qty, self.price = item, qty, price   # qty uses the setter
    @property
    def qty(self):                       # read: line.qty
        return self._qty
    @qty.setter
    def qty(self, value):                # write: line.qty = value
        if value <= 0:
            raise ValueError(f"qty must be positive, got {value}")
        self._qty = value
    @property
    def total(self):                     # computed: no parentheses
        return self._qty * self.price`,
    },
    {
      id: 'access',
      kind: 'table',
      label: 'What each access runs',
      headers: ['Access', 'Runs'],
      values: [
        ['line.qty = 0', 'the setter: ValueError'],
        ['line.total', 'the getter, each time: 13.5'],
        ['line.total = 5', 'AttributeError: no setter'],
        ['vars(line)', "stores '_qty', not 'qty'"],
      ],
    },
  ],
  edges: [{ source: 'prop', target: 'access', label: 'reading and writing' }],
}
