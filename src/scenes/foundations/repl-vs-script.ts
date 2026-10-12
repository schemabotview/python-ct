import type { Scene } from '@graphlearning/flow'

// §2 — the same lines, run two ways, and what the script actually printed. The contrast the section
// teaches is the third line: a bare expression is echoed in an interactive session and silently
// discarded in a script, so the script's output is the single 12 from line four.
export const replVsScript: Scene = {
  id: 'repl-vs-script',
  title: 'Two ways to run the same lines',
  flow: 'TB',
  nodes: [
    {
      id: 'session',
      kind: 'code',
      filename: 'interactive session',
      label: `>>> price = 4
>>> quantity = 3
>>> price * quantity
12`,
    },
    {
      id: 'script',
      kind: 'code',
      filename: 'order.py',
      label: `price = 4
quantity = 3
price * quantity
print(price * quantity)`,
    },
    {
      id: 'terminal',
      kind: 'code',
      filename: 'terminal',
      label: `$ python order.py
12`,
    },
  ],
  edges: [
    { source: 'session', target: 'script', label: 'the same lines, saved in a file' },
    { source: 'script', target: 'terminal', label: 'run: only print() shows a value' },
  ],
}
