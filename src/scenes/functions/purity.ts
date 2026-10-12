import type { Scene } from '@graphlearning/flow'

// §6 — one calculation written with an explicit input and with a hidden one, and a function that
// mutates its argument; the table classifies four functions by what their result depends on and
// what else they change.
export const purity: Scene = {
  id: 'purity',
  title: 'Pure calculations and side effects',
  flow: 'TB',
  nodes: [
    {
      id: 'funcs',
      kind: 'code',
      filename: 'purity.py',
      label: `rate = 0.5

def with_tax(price, rate):       # explicit: same input, same output
    return price * (1 + rate)

def with_global_rate(price):     # hidden dependency on rate
    return price * (1 + rate)

def sort_prices(prices):         # side effect: changes the caller's list
    prices.sort()`,
    },
    {
      id: 'classify',
      kind: 'table',
      label: 'What each function depends on and changes',
      headers: ['Function', 'Result depends on', 'Also changes'],
      values: [
        ['with_tax(price, rate)', 'its arguments only', 'nothing'],
        ['with_global_rate(price)', 'argument and global', 'nothing'],
        ['sort_prices(prices)', 'its argument', "the caller's list"],
        ['print_total(prices)', 'its argument', 'the screen'],
      ],
    },
  ],
  edges: [{ source: 'funcs', target: 'classify', label: 'classify each one' }],
}
