import type { Scene } from '@graphlearning/flow'

// §2 — the shared class attribute failure and its fix, then what the two instances actually reach.
// The diagram is drawn after a.add("tea"): both names find the one list on the class.
export const sharedAttribute: Scene = {
  id: 'shared-attribute',
  title: 'A class attribute is shared',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'basket.py',
      label: `class Basket:
    items = []                  # class attribute: ONE list
    def add(self, item):
        self.items.append(item)

a, b = Basket(), Basket()
a.add("tea")
b.items                         # ['tea']: shared by every instance
vars(a)                         # {}: nothing stored on the instance

class Basket:                   # the fix
    def __init__(self):
        self.items = []         # a new list per instance`,
    },
    {
      id: 'lookup',
      label: 'After a.add("tea")',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'a-items', label: 'a.items', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'b-items', label: 'b.items', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'one-list', label: 'Basket.items: one list, ["tea"]', variant: 'chip', pattern: 'storage', icon: 'box' },
      ],
      edges: [
        { source: 'a-items', target: 'one-list' },
        { source: 'b-items', target: 'one-list' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'lookup' }],
}
