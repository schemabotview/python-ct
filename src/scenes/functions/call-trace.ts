import type { Scene } from '@graphlearning/flow'

// §1 — three functions that return in three different ways (a value, nothing, a tuple), and the
// step-by-step trace of one call so "arguments fill parameters, return goes back to the caller" is visible.
export const callTrace: Scene = {
  id: 'call-trace',
  title: 'Define once, call many times',
  flow: 'TB',
  nodes: [
    {
      id: 'defs',
      kind: 'code',
      filename: 'functions.py',
      label: `def line_total(qty, price):
    return qty * price
line_total(3, 4.5)              # 13.5

def show_total(qty, price):
    print(qty * price)
result = show_total(3, 4.5)     # prints 13.5; result is None

def min_max(values):
    return min(values), max(values)
low, high = min_max([4.5, 8.0, 2.25])   # 2.25 and 8.0`,
    },
    {
      id: 'trace',
      kind: 'table',
      label: 'Tracing line_total(3, 4.5)',
      headers: ['step', 'what happens', 'value'],
      values: [
        ['1', 'arguments bind the parameters', 'qty = 3, price = 4.5'],
        ['2', 'the body evaluates qty * price', '13.5'],
        ['3', 'return hands it to the caller', '13.5'],
      ],
    },
  ],
  edges: [{ source: 'defs', target: 'trace', label: 'one call, step by step' }],
}
