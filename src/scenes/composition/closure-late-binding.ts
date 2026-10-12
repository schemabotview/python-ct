import type { Scene } from '@graphlearning/flow'

// §2 — a closure that remembers its rate, a counter that needs nonlocal, and the late-binding failure
// with its two repairs. All three lambdas in the failing list share one i, which ends at 2.
export const closureLateBinding: Scene = {
  id: 'closure-late-binding',
  title: 'A closure keeps its names, not their values',
  flow: 'TB',
  nodes: [
    {
      id: 'closures',
      kind: 'code',
      filename: 'closures.py',
      label: `def make_tax(rate):
    def with_tax(price):
        return price * (1 + rate)       # rate is captured
    return with_tax
make_tax(0.5)(10), make_tax(0.2)(10)    # 15.0 12.0: each has its own rate

def make_counter():
    count = 0
    def hit():
        nonlocal count                  # without it: UnboundLocalError
        count += 1
        return count
    return hit
c = make_counter(); c(), c(), c()       # 1 2 3`,
    },
    {
      id: 'late',
      kind: 'code',
      filename: 'late_binding.py',
      label: `fns = []
for i in range(3):
    fns.append(lambda: i)
[f() for f in fns]                      # [2, 2, 2]: every lambda sees the final i

[(lambda i=i: i)() for i in range(3)]   # [0, 1, 2]: default value freezes i now
[partial(lambda i: i, i)() for i in range(3)]   # [0, 1, 2]`,
    },
  ],
  edges: [{ source: 'closures', target: 'late', label: 'the classic trap' }],
}
