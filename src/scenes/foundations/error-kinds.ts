import type { Scene } from '@graphlearning/flow'

// §6 — a real traceback beside the three kinds of failure it does and does not cover. Only the
// runtime error produces a traceback; a syntax error stops before any line runs, and a result error
// produces no message at all.
export const errorKinds: Scene = {
  id: 'error-kinds',
  title: 'Three ways a program goes wrong',
  flow: 'TB',
  nodes: [
    {
      id: 'traceback',
      kind: 'code',
      filename: 'terminal',
      label: `Traceback (most recent call last):
  File "order.py", line 2, in <module>
    quantity = int(text)
ValueError: invalid literal for int()
with base 10: 'three'`,
    },
    {
      id: 'kinds',
      label: 'Kinds of error',
      sub: 'when each one appears',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'syntax', label: 'Syntax error', sub: 'before any line runs', pattern: 'warn', icon: 'ban' },
        { id: 'runtime', label: 'Runtime error', sub: 'while a line runs', pattern: 'warn', icon: 'bug' },
        { id: 'result', label: 'Wrong result', sub: 'runs, answer is wrong', pattern: 'warn', icon: 'scale' },
      ],
    },
  ],
  edges: [{ source: 'traceback', target: 'runtime' }],
}
