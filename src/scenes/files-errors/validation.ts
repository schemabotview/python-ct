import type { Scene } from '@graphlearning/flow'

// §8 — three rows with three different shapes of problem (good, a bad number, a missing price that a
// short CSV row turns into None), a validator that returns every problem, and the four recovery policies.
export const validation: Scene = {
  id: 'validation',
  title: 'Find every problem, then choose a policy',
  flow: 'TB',
  nodes: [
    {
      id: 'check',
      kind: 'code',
      filename: 'validate.py',
      label: `rows = [
    {"id": "A-1001", "qty": "3", "price": "4.5"},
    {"id": "A-1002", "qty": "x", "price": "8.0"},
    {"id": "A-1003", "qty": "2", "price": None},   # a short CSV row
]
def problems(row):
    found = []
    if not (row["qty"] or "").isdigit():
        found.append("qty is not a whole number")
    if not row["price"]:
        found.append("price is missing")
    return found
[problems(r) for r in rows]
# [[], ['qty is not a whole number'], ['price is missing']]`,
    },
    {
      id: 'policies',
      kind: 'table',
      label: 'Recovery policies',
      headers: ['Policy', 'Use when', 'Cost'],
      values: [
        ['stop at the first error', 'money must be right', 'one bad row blocks all'],
        ['skip and report', 'bulk imports', 'someone must read the report'],
        ['use a default', 'the field is optional', 'can hide real gaps'],
        ['repair', 'the rule is certain', 'wrong guesses spread'],
      ],
    },
  ],
  edges: [{ source: 'check', target: 'policies', label: 'what to do with a bad row' }],
}
