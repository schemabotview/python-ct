import type { Scene } from '@graphlearning/flow'

// §1 — comparisons and the Boolean operators on the order values, then the truthiness table that
// decides what counts as true. The last code line is the short-circuit example: the division on the
// right is never evaluated when the left side is already False.
export const truthAndLogic: Scene = {
  id: 'truth-and-logic',
  title: 'Conditions: comparisons, and, or, not',
  flow: 'TB',
  nodes: [
    {
      id: 'logic',
      kind: 'code',
      filename: 'conditions.py',
      label: `qty, price = 3, 4.5
qty > 2 and price < 5        # True
0 < qty <= 5                 # True: chained comparison
not qty                      # False
coupon = None
coupon or "no coupon"        # 'no coupon'
qty and price                # 4.5: the last operand evaluated
qty = 0
qty != 0 and 100 / qty > 20  # False, and no ZeroDivisionError`,
    },
    {
      id: 'truthy',
      kind: 'table',
      label: 'What bool(value) gives',
      headers: ['Value', 'bool(value)', 'Why'],
      values: [
        ['0', 'False', 'zero'],
        ['""', 'False', 'empty text'],
        ['[]', 'False', 'empty collection'],
        ['None', 'False', 'no value'],
        ['"0"', 'True', 'non-empty text'],
        ['[0]', 'True', 'non-empty list'],
        ['"False"', 'True', 'non-empty text'],
      ],
    },
  ],
  edges: [{ source: 'logic', target: 'truthy', label: 'what counts as true' }],
}
