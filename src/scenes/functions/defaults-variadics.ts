import type { Scene } from '@graphlearning/flow'

// §3 — the shared-default failure and its fix, then what the star parameters collect. The failing
// version is shown first because the surprise is the lesson: the second call sees the first call's item.
export const defaultsVariadics: Scene = {
  id: 'defaults-variadics',
  title: 'Defaults, and a default that is shared',
  flow: 'TB',
  nodes: [
    {
      id: 'basket',
      kind: 'code',
      filename: 'basket.py',
      label: `def add_item(item, basket=[]):      # one list, made once
    basket.append(item)
    return basket

add_item("tea")      # ['tea']
add_item("mug")      # ['tea', 'mug']  shared!

def add_item(item, basket=None):    # the fix
    if basket is None:
        basket = []                 # a new list on every call
    basket.append(item)
    return basket`,
    },
    {
      id: 'variadic',
      kind: 'table',
      label: 'What the star parameters collect',
      headers: ['Call', 'Parameter holds'],
      values: [
        ['total(4.5, 8.0)', 'prices = (4.5, 8.0)'],
        ['total(*[4.5, 8.0])', 'prices = (4.5, 8.0)'],
        ['describe(item="tea", qty=3)', "details = {'item': 'tea', 'qty': 3}"],
      ],
    },
  ],
  edges: [{ source: 'basket', target: 'variadic', label: '*prices and **details' }],
}
