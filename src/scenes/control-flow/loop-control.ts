import type { Scene } from '@graphlearning/flow'

// §5 — break with a loop else, continue, and a table of the mistakes that make loops misbehave.
export const loopControl: Scene = {
  id: 'loop-control',
  title: 'break, continue, and loop else',
  flow: 'TB',
  nodes: [
    {
      id: 'control',
      kind: 'code',
      filename: 'loops.py',
      label: `for code in ["A-1", "B-2", "C-3"]:
    if code == "B-2":
        print("found", code)   # found B-2
        break
else:
    print("not found")         # only if no break ran

for qty in [3, 0, 2]:
    if qty == 0:
        continue               # skip to the next pass
    print(100 / qty)           # 33.333333333333336, then 50.0`,
    },
    {
      id: 'mistakes',
      kind: 'table',
      label: 'Common loop mistakes',
      headers: ['Mistake', 'What happens', 'Fix'],
      values: [
        ['remove() inside a for', 'skips items', 'build a new list'],
        ['no progress in while', 'never ends', 'change the variable'],
        ['range(len(x))', 'clumsy indexing', 'loop over x directly'],
        ['if x = 3:', 'SyntaxError', 'use == to compare'],
      ],
    },
  ],
  edges: [{ source: 'control', target: 'mistakes', label: 'where loops go wrong' }],
}
