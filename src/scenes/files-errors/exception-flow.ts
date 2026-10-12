import type { Scene } from '@graphlearning/flow'

// §6 — all four blocks in one function, and a table that traces which of them run for good and bad
// input. The table is the exception-flow picture: try always starts, finally always ends.
export const exceptionFlow: Scene = {
  id: 'exception-flow',
  title: 'try, except, else, finally',
  flow: 'TB',
  nodes: [
    {
      id: 'func',
      kind: 'code',
      filename: 'handling.py',
      label: `def read_qty(text):
    try:
        qty = int(text)
    except ValueError:
        print("not a number")
        return None
    else:
        print("parsed")
        return qty
    finally:
        print("done")

read_qty("3")   # parsed, done: returns 3
read_qty("x")   # not a number, done: returns None`,
    },
    {
      id: 'flow',
      kind: 'table',
      label: 'Which blocks run?',
      headers: ['Input', 'try', 'except', 'else', 'finally'],
      values: [
        ['"3"', 'completes', 'skipped', 'runs', 'runs'],
        ['"x"', 'stops at int()', 'runs', 'skipped', 'runs'],
      ],
    },
  ],
  edges: [{ source: 'func', target: 'flow', label: 'trace both inputs' }],
}
