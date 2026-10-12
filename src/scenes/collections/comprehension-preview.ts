import type { Scene } from '@graphlearning/flow'

// §9 — the same calculation as a loop and as a comprehension, then the filter and the other two
// bracket styles. The mechanics of the loop and the filter are Chapter 3's; this is only a preview.
export const comprehensionPreview: Scene = {
  id: 'comprehension-preview',
  title: 'A loop, and the comprehension that replaces it',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      filename: 'loop.py',
      label: `lines = [(3, 4.5), (1, 8.0), (2, 2.25)]
totals = []
for qty, price in lines:
    totals.append(qty * price)
# totals is [13.5, 8.0, 4.5]`,
    },
    {
      id: 'comp',
      kind: 'code',
      filename: 'comprehensions.py',
      label: `[qty * price for qty, price in lines]
# [13.5, 8.0, 4.5]

[qty * price for qty, price in lines if qty > 1]
# [13.5, 4.5]

names = ["tea", "mug", "jar"]
{n: len(n) for n in names}   # {'tea': 3, 'mug': 3, 'jar': 3}
{len(n) for n in names}      # {3}`,
    },
  ],
  edges: [{ source: 'loop', target: 'comp', label: 'the same, as one expression' }],
}
