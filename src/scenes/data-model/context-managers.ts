import type { Scene } from '@graphlearning/flow'

// §4 — a resource manager written as a class (the protocol itself) and as a generator with
// @contextmanager (the short form). The comments carry the exact output of running both.
export const contextManagers: Scene = {
  id: 'context-managers',
  title: 'with calls __enter__ and __exit__',
  flow: 'TB',
  nodes: [
    {
      id: 'protocol',
      kind: 'code',
      filename: 'class_form.py',
      label: `class Opened:
    def __init__(self, name): self.name = name
    def __enter__(self):
        print("open", self.name); return self
    def __exit__(self, exc_type, exc, tb):
        print("close", self.name); return False   # False: do not hide errors

with Opened("orders") as r:     # open orders
    print("using", r.name)      # using orders, then: close orders`,
    },
    {
      id: 'short',
      kind: 'code',
      filename: 'generator_form.py',
      label: `from contextlib import contextmanager

@contextmanager
def opened(name):
    print("open", name)
    try:
        yield name.upper()          # the value bound by "as"
    finally:
        print("close", name)        # runs even if the block raises

with opened("orders") as n:         # n is 'ORDERS'
    ...`,
    },
  ],
  edges: [{ source: 'protocol', target: 'short', label: 'the same, as a generator' }],
}
