import type { Scene } from '@graphlearning/flow'

// §1 — iter and next by hand, the exhaustion that follows, and an iterator written as a class. The
// table is the whole protocol: what a list has that an iterator does not, and the reverse.
export const iteratorProtocol: Scene = {
  id: 'iterator-protocol',
  title: 'iter() and next()',
  flow: 'TB',
  nodes: [
    {
      id: 'by-hand',
      kind: 'code',
      filename: 'iterators.py',
      label: `it = iter([3, 5])
next(it)           # 3
next(it)           # 5
next(it)           # StopIteration: the iterator is exhausted
list(it)           # []: an exhausted iterator stays empty

class Countdown:
    def __init__(self, start): self.n = start
    def __iter__(self): return self
    def __next__(self):
        if self.n <= 0: raise StopIteration
        self.n -= 1
        return self.n + 1
list(Countdown(3))     # [3, 2, 1]`,
    },
    {
      id: 'protocol',
      kind: 'table',
      label: 'Iterable versus iterator',
      headers: ['Property', 'list', 'iter(list)'],
      values: [
        ['has __iter__', 'yes', 'yes'],
        ['has __next__', 'no', 'yes'],
        ['iter(x) is x', 'False', 'True'],
      ],
    },
  ],
  edges: [{ source: 'by-hand', target: 'protocol', label: 'the two roles' }],
}
