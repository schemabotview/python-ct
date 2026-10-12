import type { Scene } from '@graphlearning/flow'

// §5 — a class that defines __eq__ and loses hashing, regains it with __hash__, and then loses a dict
// entry by mutating its key; the table classifies the types met so far by what == compares and whether
// they hash.
export const hashContract: Scene = {
  id: 'hash-contract',
  title: 'Equal objects must hash alike',
  flow: 'TB',
  nodes: [
    {
      id: 'keys',
      kind: 'code',
      filename: 'hashing.py',
      label: `class Key:
    def __init__(self, k): self.k = k
    def __eq__(self, o): return isinstance(o, Key) and self.k == o.k
hash(Key(1))               # TypeError: __eq__ without __hash__ removes hashing

class Key2(Key):
    def __hash__(self): return hash(self.k)
k = Key2(1); d = {k: "a"}
d[Key2(1)]                 # 'a': equal objects, equal hashes
k.k = 2                    # mutate the key...
d[Key2(1)]                 # KeyError: the entry is lost`,
    },
    {
      id: 'types',
      kind: 'table',
      label: 'Equality and hashing by type',
      headers: ['Type', '== compares', 'Hashable?'],
      values: [
        ['list', 'contents', 'no'],
        ['tuple', 'contents', 'if its items are'],
        ['dataclass', 'fields', 'no, unless frozen'],
        ['plain class', 'identity', 'yes, by identity'],
      ],
    },
  ],
  edges: [{ source: 'keys', target: 'types', label: 'by type' }],
}
