import type { Scene } from '@graphlearning/flow'

// §1 — functions stored, passed and returned as values, a callable object, and what a lambda can and
// cannot be. The table sorts four kinds of callable by what each can hold on to.
export const callables: Scene = {
  id: 'callables',
  title: 'Anything callable can be passed around',
  flow: 'TB',
  nodes: [
    {
      id: 'values',
      kind: 'code',
      filename: 'callables.py',
      label: `def tax(price): return price * 1.5
rules = {"tax": tax, "double": lambda v: v * 2, "strip": str.strip}
rules["tax"](10)                  # 15.0

class Rate:
    def __init__(self, rate): self.rate = rate
    def __call__(self, price): return price * (1 + self.rate)
r = Rate(0.5); r(10)              # 15.0: an object you can call

max(sales, key=lambda s: s[1] * s[2])   # a lambda, used once
add = lambda a, b: a + b                # works, but add.__name__ is '<lambda>'
lambda: x = 1                           # SyntaxError: a lambda holds one expression`,
    },
    {
      id: 'kinds',
      kind: 'table',
      label: 'Four kinds of callable',
      headers: ['Callable', 'Has a name', 'Holds state'],
      values: [
        ['def function', 'yes', 'no'],
        ['lambda', "no ('<lambda>')", 'no'],
        ['callable object', 'its class', 'yes: attributes'],
        ['closure', 'yes', 'yes: captured names'],
      ],
    },
  ],
  edges: [{ source: 'values', target: 'kinds', label: 'what each can hold' }],
}
