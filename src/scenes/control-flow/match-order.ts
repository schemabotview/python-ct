import type { Scene } from '@graphlearning/flow'

// §6 — a match statement on an order record, and the pattern kinds it is built from. The first case
// that fits wins, which is why the more specific dictionary pattern comes before the general one.
export const matchOrder: Scene = {
  id: 'match-order',
  title: 'match compares shapes, top to bottom',
  flow: 'TB',
  nodes: [
    {
      id: 'match',
      kind: 'code',
      filename: 'status.py',
      label: `order = {"item": "tea", "qty": 3}
match order:
    case {"item": "tea", "qty": 0}:
        status = "empty"
    case {"item": "tea", "qty": q}:
        status = f"{q} tea"      # status is '3 tea'
    case {"item": other}:
        status = other
    case _:
        status = "unknown"`,
    },
    {
      id: 'patterns',
      kind: 'table',
      label: 'Pattern kinds',
      headers: ['Pattern', 'Matches', 'Binds'],
      values: [
        ['"tea"', 'that exact value', 'nothing'],
        ['item', 'anything', 'item'],
        ['_', 'anything', 'nothing'],
        ['("add", item, qty)', 'a 3-tuple', 'item, qty'],
        ['{"item": x}', 'dict with the key', 'x'],
      ],
    },
  ],
  edges: [{ source: 'match', target: 'patterns', label: 'built from patterns' }],
}
