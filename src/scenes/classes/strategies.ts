import type { Scene } from '@graphlearning/flow'

// §7 — three unrelated classes that share only a method name, a function that accepts any of them, and
// the failure when an object lacks the method. The table is each strategy's answer for 3 and for 10.
export const strategies: Scene = {
  id: 'strategies',
  title: 'Any object with price() will do',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'pricing.py',
      label: `class PerUnit:
    def price(self, qty): return qty * 4.5
class Bulk:
    def price(self, qty): return qty * 4.5 * (0.9 if qty >= 10 else 1)
class Flat:
    def price(self, qty): return 20.0

def order_cost(strategy, qty):
    return strategy.price(qty)    # any object with price() works

order_cost(Bulk(), 10)            # 40.5
order_cost("tea", 3)              # AttributeError: no attribute 'price'`,
    },
    {
      id: 'answers',
      kind: 'table',
      label: 'order_cost for each strategy',
      headers: ['Strategy', 'qty 3', 'qty 10'],
      values: [
        ['PerUnit()', '13.5', '45.0'],
        ['Bulk()', '13.5', '40.5'],
        ['Flat()', '20.0', '20.0'],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'answers', label: 'same call, different answers' }],
}
