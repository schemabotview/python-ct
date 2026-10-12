import type { Scene } from '@graphlearning/flow'

// §4 — what @wraps repairs, partial, and caching with the staleness it can hide. The cache example is
// deliberately a function that reads a global: the second call returns the OLD answer.
export const functoolsTools: Scene = {
  id: 'functools-tools',
  title: 'wraps, partial, and caching',
  flow: 'TB',
  nodes: [
    {
      id: 'wraps',
      kind: 'code',
      filename: 'wraps_partial.py',
      label: `import functools
def log2(fn):
    @functools.wraps(fn)           # copy name, docstring, signature onto wrapper
    def wrapper(*a, **k): return fn(*a, **k)
    return wrapper
# without wraps: lt.__name__ is 'wrapper', signature is (*a, **k)
# with wraps:    lt.__name__ is 'lt',      signature is (qty, price)

p50 = functools.partial(price_with, 0.5)   # fix the first argument
p50(10)                                    # 15.0`,
    },
    {
      id: 'cache',
      kind: 'code',
      filename: 'caching.py',
      label: `RATE = {"v": 0.5}
@functools.cache
def with_rate(price): return price * (1 + RATE["v"])
with_rate(10)         # 15.0
RATE["v"] = 1.0
with_rate(10)         # 15.0: stale! the real answer is 20.0
with_rate.cache_info()   # CacheInfo(hits=1, misses=1, ...)
with_rate([1])        # TypeError: unhashable type: 'list'`,
    },
  ],
  edges: [{ source: 'wraps', target: 'cache', label: 'caching trade-offs' }],
}
