import type { Scene } from '@graphlearning/flow'

// §7 — a domain error raised from a low-level one, and the part of the real traceback that shows the
// chain. Frame lines are omitted from the second card: the two exception lines and the sentence
// between them are the lesson.
export const chaining: Scene = {
  id: 'chaining',
  title: 'A domain error with its cause attached',
  flow: 'TB',
  nodes: [
    {
      id: 'raise',
      kind: 'code',
      filename: 'orders.py',
      label: `class OrderError(ValueError):
    """An order line that cannot be accepted."""

def parse_qty(row):
    try:
        return int(row["qty"])
    except ValueError as err:
        raise OrderError(f"bad qty {row['qty']!r} in {row['id']}") from err`,
    },
    {
      id: 'trace',
      kind: 'code',
      filename: 'terminal  (frames omitted)',
      label: `ValueError: invalid literal for int() with base 10: 'x'

The above exception was the direct cause of the following exception:

OrderError: bad qty 'x' in A-1002`,
    },
  ],
  edges: [{ source: 'raise', target: 'trace', label: 'parse_qty({"id": "A-1002", "qty": "x"})' }],
}
