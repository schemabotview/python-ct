import type { Scene } from '@graphlearning/flow'

// §2 — a generator that prints as it runs, so the pause-and-resume is visible, and the table of what
// each next() call prints and returns. The last code line is the generator expression form.
export const generatorTrace: Scene = {
  id: 'generator-trace',
  title: 'A generator pauses at each yield',
  flow: 'TB',
  nodes: [
    {
      id: 'gen',
      kind: 'code',
      filename: 'generators.py',
      label: `def order_ids(n):
    print("start")
    for i in range(1, n + 1):
        print("yield", i)
        yield f"A-{1000 + i}"
    print("done")

g = order_ids(2)    # nothing runs yet: a generator object comes back
next(g)             # 'A-1001'
next(g)             # 'A-1002'
next(g)             # StopIteration
sum(q * p for q, p in [(3, 4.5), (1, 8.0)])   # a generator expression: 21.5`,
    },
    {
      id: 'trace',
      kind: 'table',
      label: 'What each call prints and returns',
      headers: ['Call', 'Prints', 'Result'],
      values: [
        ['order_ids(2)', 'nothing', 'a generator'],
        ['next(g)', 'start, yield 1', "'A-1001'"],
        ['next(g)', 'yield 2', "'A-1002'"],
        ['next(g)', 'done', 'StopIteration'],
      ],
    },
  ],
  edges: [{ source: 'gen', target: 'trace', label: 'execution state' }],
}
