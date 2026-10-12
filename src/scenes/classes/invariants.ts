import type { Scene } from '@graphlearning/flow'

// §8 — a frozen dataclass that refuses invalid state at construction, and a table for the choice the
// whole chapter has been building toward: function, dataclass, or class.
export const invariants: Scene = {
  id: 'invariants',
  title: 'A class guards its rules',
  flow: 'TB',
  nodes: [
    {
      id: 'guard',
      kind: 'code',
      filename: 'invariants.py',
      label: `from dataclasses import dataclass

@dataclass(frozen=True)
class LineItem:
    item: str
    qty: int
    price: float

    def __post_init__(self):          # runs right after the generated __init__
        if self.qty <= 0:
            raise ValueError(f"qty must be positive, got {self.qty}")

LineItem("tea", 3, 4.5)               # LineItem(item='tea', qty=3, price=4.5)
LineItem("tea", 0, 4.5)               # ValueError: qty must be positive, got 0`,
    },
    {
      id: 'choice',
      kind: 'table',
      label: 'Function, dataclass, or class?',
      headers: ['Situation', 'Choose'],
      values: [
        ['one calculation, no stored state', 'a function'],
        ['fixed fields, little behaviour', 'a dataclass'],
        ['state that must stay valid', 'a class that guards it'],
        ['interchangeable behaviours', 'functions or small classes'],
      ],
    },
  ],
  edges: [{ source: 'guard', target: 'choice', label: 'choosing' }],
}
