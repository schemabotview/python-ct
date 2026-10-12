import type { Scene } from '@graphlearning/flow'

// §4 — the Chapter 1 and 2 name-to-object picture across a function call. The caller's names and the
// parameters point at the same objects; mutating the dict is visible to the caller, while rebinding
// price makes a new float and leaves p alone. Compact chips keep the container narrow.
export const callBinding: Scene = {
  id: 'call-binding',
  title: 'Parameters are new names for the same objects',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'binding.py',
      label: `def add_coupon(order):
    order["coupon"] = "SAVE5"   # changes the shared dict
def raise_price(price):
    price = price * 2           # rebinds the local name only

order = {"item": "tea"}
p = 4.5
add_coupon(order)
raise_price(p)                  # p is still 4.5`,
    },
    {
      id: 'diagram',
      label: 'After both calls',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'c-order', label: 'order (caller)', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'p-order', label: 'order (param)', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'c-p', label: 'p (caller)', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'p-price', label: 'price (param)', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'o-dict', label: 'order dict + coupon', variant: 'chip', pattern: 'storage', icon: 'box' },
        { id: 'o-old', label: '4.5 (original)', variant: 'chip', pattern: 'storage', icon: 'box' },
        { id: 'o-new', label: '9.0 (new float)', variant: 'chip', pattern: 'storage', icon: 'box' },
      ],
      edges: [
        { source: 'c-order', target: 'o-dict' },
        { source: 'p-order', target: 'o-dict' },
        { source: 'c-p', target: 'o-old' },
        { source: 'p-price', target: 'o-new' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'diagram' }],
}
