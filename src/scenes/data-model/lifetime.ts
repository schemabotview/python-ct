import type { Scene } from '@graphlearning/flow'

// §9 — reference counts, a __del__ that fires at once, and a cycle that survives until the collector
// runs. Everything printed is CPython behaviour; the table separates what is a guarantee of the
// language from what is a detail of this implementation.
export const lifetime: Scene = {
  id: 'lifetime',
  title: 'Objects live while something refers to them',
  flow: 'TB',
  nodes: [
    {
      id: 'refs',
      kind: 'code',
      filename: 'lifetime.py  (CPython)',
      label: `import sys, gc
x = [1]
sys.getrefcount(x)     # 2: the name x, plus the call's own argument
y = x
sys.getrefcount(x)     # 3

class Res:
    def __init__(self, n): self.n = n
    def __del__(self): print("del", self.n)
r = Res(1); del r      # prints "del 1" at once: the count reached zero
a, b = Res(2), Res(3)
a.other, b.other = b, a    # a cycle
del a, b               # nothing printed: each keeps the other alive
gc.collect()           # now "del 2" and "del 3"`,
    },
    {
      id: 'guarantee',
      kind: 'table',
      label: 'Language guarantee or CPython detail?',
      headers: ['Fact', 'Which'],
      values: [
        ['freed when the count reaches zero', 'CPython detail'],
        ['cycles need the cycle collector', 'CPython detail'],
        ['when __del__ runs', 'not guaranteed'],
        ['with / close() run when you say', 'guaranteed'],
      ],
    },
  ],
  edges: [{ source: 'refs', target: 'guarantee', label: 'what to rely on' }],
}
