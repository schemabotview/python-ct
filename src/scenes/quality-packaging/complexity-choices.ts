import type { Scene } from '@graphlearning/flow'

// §5 — the collection choices from Chapters 2 and 3 compared by how their cost grows, and a
// memory comparison. The speed claims were each measured (list `in` was over 100x slower than set `in`
// for a 200,000-item collection; Counter beat repeated .count); getsizeof values are CPython 3.13.
export const complexityChoices: Scene = {
  id: 'complexity-choices',
  title: 'How cost grows with size',
  flow: 'TB',
  nodes: [
    {
      id: 'choices',
      kind: 'table',
      label: 'Operation cost by collection',
      headers: ['Operation', 'Cost as n grows', 'Prefer'],
      values: [
        ['x in a_list', 'grows with n', 'a set, for many lookups'],
        ['x in a_set / a_dict', 'about constant', ''],
        ['list.append(x)', 'about constant', ''],
        ['list.insert(0, x)', 'grows with n', 'collections.deque'],
        ['deque.appendleft(x)', 'about constant', ''],
        ['for each word: words.count(w)', 'n times n', 'collections.Counter'],
      ],
    },
    {
      id: 'memory',
      kind: 'code',
      filename: 'memory.py  (CPython 3.13)',
      label: `sys.getsizeof([])                     # 56 bytes: an empty list
sys.getsizeof(list(range(1000)))      # over 8000 bytes: grows with the items
sys.getsizeof(range(10**9))           # 48 bytes: a range stores no items
sys.getsizeof((i for i in range(10**9)))   # under 300 bytes: a generator keeps its state`,
    },
  ],
  edges: [{ source: 'choices', target: 'memory', label: 'time and memory' }],
}
