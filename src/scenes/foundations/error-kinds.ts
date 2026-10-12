import type { Scene } from '@graphlearning/flow'

// §6 — one worked example per kind of failure, stacked so each reads at full width. Only the runtime
// error produces a traceback; a syntax error stops before any line runs, and a result error
// produces no message at all, which is why its card shows a wrong answer and no error text.
export const errorKinds: Scene = {
  id: 'error-kinds',
  title: 'Three ways a program goes wrong',
  flow: 'TB',
  nodes: [
    {
      id: 'syntax',
      label: 'Syntax error — nothing runs',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'syntax-code',
          kind: 'code',
          filename: 'order.py',
          label: `print("Total:" 12)
SyntaxError: invalid syntax. Perhaps you forgot a comma?`,
        },
      ],
    },
    {
      id: 'runtime',
      label: 'Runtime error — a line fails while running',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'runtime-code',
          kind: 'code',
          filename: 'terminal',
          label: `Traceback (most recent call last):
  File "order.py", line 2, in <module>
    quantity = int(text)
ValueError: invalid literal for int() with base 10: 'three'`,
        },
      ],
    },
    {
      id: 'wrong',
      label: 'Wrong result — runs, no message',
      pattern: 'warn',
      cols: 1,
      children: [
        {
          id: 'wrong-code',
          kind: 'code',
          filename: 'order.py',
          label: `total = price + quantity   # meant price * quantity
print(total)               # 7.5, not 13.5`,
        },
      ],
    },
  ],
  edges: [],
}
