import type { Scene } from '@graphlearning/flow'

// §3 — a two-stage generator pipeline that prints as it reads and parses, so each item visibly travels
// through every stage before the next is read; a one-shot generator; and the eager-versus-lazy table.
export const lazyPipeline: Scene = {
  id: 'lazy-pipeline',
  title: 'One item at a time, on demand',
  flow: 'TB',
  nodes: [
    {
      id: 'pipe',
      kind: 'code',
      filename: 'pipeline.py',
      label: `def read_rows():
    for row in ["tea,3", "mug,1"]:
        print("read", row)
        yield row
def parse(rows):
    for row in rows:
        print("parse", row)
        yield row.split(",")
pipe = parse(read_rows())
next(pipe)     # read tea,3 / parse tea,3 -> ['tea', '3']
next(pipe)     # read mug,1 / parse mug,1 -> ['mug', '1']
totals = (q * p for q, p in [(3, 4.5), (1, 8.0)])
list(totals)   # [13.5, 8.0]
list(totals)   # []: already consumed`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Eager versus lazy',
      headers: ['', 'list', 'generator'],
      values: [
        ['work done', 'all, up front', 'on demand'],
        ['memory', 'every item', 'one item'],
        ['loop twice', 'yes', 'no: one-shot'],
        ['endless source', 'impossible', 'possible'],
      ],
    },
  ],
  edges: [{ source: 'pipe', target: 'compare' }],
}
