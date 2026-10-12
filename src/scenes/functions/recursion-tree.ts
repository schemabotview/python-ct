import type { Scene } from '@graphlearning/flow'

// §8 — the recursive function and the category tree it walks. Leaf cards (no children) are the base
// case; the subtotal in each card is what that call returns, so the tree is also the call trace.
export const recursionTree: Scene = {
  id: 'recursion-tree',
  title: 'A function that calls itself',
  flow: 'TB',
  nodes: [
    {
      id: 'func',
      kind: 'code',
      filename: 'categories.py',
      label: `def category_total(cat):
    total = cat["total"]
    for child in cat["children"]:
        total += category_total(child)   # the recursive call
    return total                         # no children: no recursion`,
    },
    {
      id: 'tree',
      label: 'Tree: own total, and returned total',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'drinks', label: 'Drinks: own 0, returns 24.0', variant: 'chip', pattern: 'service', icon: 'tree' },
        { id: 'tea', label: 'Tea: own 13.5, returns 13.5', variant: 'chip', pattern: 'storage', icon: 'box' },
        { id: 'coffee', label: 'Coffee: own 8.0, returns 10.5', variant: 'chip', pattern: 'service', icon: 'tree' },
        { id: 'espresso', label: 'Espresso: own 2.5, returns 2.5', variant: 'chip', pattern: 'storage', icon: 'box' },
      ],
      edges: [
        { source: 'drinks', target: 'tea' },
        { source: 'drinks', target: 'coffee' },
        { source: 'coffee', target: 'espresso' },
      ],
    },
  ],
  edges: [{ source: 'func', target: 'tree' }],
}
