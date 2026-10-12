import type { Scene } from '@graphlearning/flow'

// §4 — the same order line as a dataclass, an Order whose list default is created per instance, and the
// methods @dataclass wrote. The commented-out line is the mistake dataclasses refuse to let you make.
export const dataclassGenerated: Scene = {
  id: 'dataclass-generated',
  title: 'Fields in, methods out',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'dataclasses.py',
      label: `from dataclasses import dataclass, field

@dataclass
class LineItem:
    item: str
    qty: int
    price: float
LineItem("tea", 3, 4.5)     # LineItem(item='tea', qty=3, price=4.5)
LineItem("tea", 3, 4.5) == LineItem("tea", 3, 4.5)    # True
@dataclass
class Order:
    id: str
    lines: list = field(default_factory=list)   # a new list per instance
    # lines: list = []   -> ValueError: mutable default`,
    },
    {
      id: 'written',
      kind: 'table',
      label: 'What @dataclass writes for you',
      headers: ['Written', 'Behaviour'],
      values: [
        ['__init__', 'takes the fields, in order'],
        ['__repr__', "LineItem(item='tea', ...)"],
        ['__eq__', 'equal when every field is equal'],
        ['frozen=True', 'assigning raises FrozenInstanceError'],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'written', label: 'generated from the fields' }],
}
