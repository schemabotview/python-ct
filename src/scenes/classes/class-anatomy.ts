import type { Scene } from '@graphlearning/flow'

// §1 — the order line as a class: construction, reading and changing state, and the two failures a
// beginner meets first. The table fixes the four words every later section uses.
export const classAnatomy: Scene = {
  id: 'class-anatomy',
  title: 'A class builds instances',
  flow: 'TB',
  nodes: [
    {
      id: 'cls',
      kind: 'code',
      filename: 'line_item.py',
      label: `class LineItem:
    def __init__(self, item, qty, price):    # runs when an instance is created
        self.item = item
        self.qty = qty
        self.price = price

line = LineItem("tea", 3, 4.5)   # create an instance
line.qty                         # 3
line.qty = 4                     # state can change
vars(line)                       # {'item': 'tea', 'qty': 4, 'price': 4.5}
isinstance(line, LineItem)       # True
LineItem("tea", 3)               # TypeError: missing 'price'`,
    },
    {
      id: 'terms',
      kind: 'table',
      label: 'Four words for this section',
      headers: ['Term', 'Meaning', 'Here'],
      values: [
        ['class', 'a blueprint for objects', 'LineItem'],
        ['instance', 'one object built from it', 'line'],
        ['attribute', 'a name stored on an object', 'line.qty'],
        ['__init__', 'sets up a new instance', 'LineItem("tea", 3, 4.5)'],
      ],
    },
  ],
  edges: [{ source: 'cls', target: 'terms', label: 'the vocabulary' }],
}
