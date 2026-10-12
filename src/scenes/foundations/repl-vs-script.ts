import type { Scene } from '@graphlearning/flow'

// §2 — the same lines, run two ways. The contrast the section teaches is the third line:
// a bare expression is echoed in an interactive session and silently discarded in a script.
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
  ],
  edges: [{ source: 'session', target: 'script', label: 'the same lines, saved in a file' }],
}
