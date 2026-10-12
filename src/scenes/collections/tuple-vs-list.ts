import type { Scene } from '@graphlearning/flow'

// §3 — the same order as a tuple, what it refuses to do, and the list-versus-tuple choice in one table.
export const tupleVsList: Scene = {
  id: 'tuple-vs-list',
  title: 'A tuple is a fixed record',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'code',
      filename: 'tuples.py',
      label: `order = ("A-1001", "tea", 3, 4.5)
order[1]        # 'tea'
order[-1]       # 4.5
order[1:3]      # ('tea', 3)
order[2] = 4    # TypeError (immutable)
type((3,))      # <class 'tuple'>
type((3))       # <class 'int'>
{order: 1}      # works: a tuple can be a key
{[1, 2]: 1}     # TypeError: unhashable type: 'list'`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'List or tuple?',
      headers: ['', 'list', 'tuple'],
      values: [
        ['literal', '[1, 2]', '(1, 2)'],
        ['changes after creation', 'yes', 'no'],
        ['usually holds', 'many alike items', 'fields of one record'],
        ['usable as a dict key', 'no', 'yes'],
        ['one item', '[3]', '(3,)'],
      ],
    },
  ],
  edges: [{ source: 'record', target: 'compare', label: 'choosing between them' }],
}
