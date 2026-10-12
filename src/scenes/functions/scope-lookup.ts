import type { Scene } from '@graphlearning/flow'

// §5 — a global read from inside a function, a local that disappears, and the assignment that turns a
// read into an UnboundLocalError; the table gives the four-step lookup order.
export const scopeLookup: Scene = {
  id: 'scope-lookup',
  title: 'Where a name is looked up',
  flow: 'TB',
  nodes: [
    {
      id: 'scopes',
      kind: 'code',
      filename: 'scope.py',
      label: `rate = 0.2                      # global
def with_tax(price):            # price is local
    tax = price * rate          # tax is local; rate is global
    return price + tax

with_tax(10)                    # 12.0
tax                             # NameError: 'tax' is not defined

count = 0
def bump():
    count = count + 1           # UnboundLocalError`,
    },
    {
      id: 'legb',
      kind: 'table',
      label: 'Lookup order, innermost first',
      headers: ['Scope', 'Where it lives', 'Example'],
      values: [
        ['Local', 'the running function', 'price, tax'],
        ['Enclosing', 'an outer function', 'rate in order_report'],
        ['Global', 'the module', 'rate = 0.2'],
        ['Built-in', 'Python itself', 'len, sum, print'],
      ],
    },
  ],
  edges: [{ source: 'scopes', target: 'legb', label: 'LEGB' }],
}
