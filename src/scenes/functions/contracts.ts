import type { Scene } from '@graphlearning/flow'

// §7 — one function with all three tools, the same signature without validation showing that
// annotations do not stop a bad call, and the table of what each tool is for.
export const contracts: Scene = {
  id: 'contracts',
  title: 'Docstring, annotations, and validation',
  flow: 'TB',
  nodes: [
    {
      id: 'contract',
      kind: 'code',
      filename: 'contract.py',
      label: `def line_total(qty: int, price: float) -> float:
    """Return the cost of qty items at price each."""
    if qty < 0:
        raise ValueError("qty must not be negative")
    return qty * price

line_total(-1, 4.5)     # ValueError: qty must not be negative
line_total.__doc__      # 'Return the cost of qty items at price each.'

def plain_total(qty: int, price: float) -> float:
    return qty * price

plain_total("ab", 2)    # 'abab': the annotations did not stop it`,
    },
    {
      id: 'roles',
      kind: 'table',
      label: 'Three tools, three jobs',
      headers: ['Tool', 'Written for', 'Stops bad input?'],
      values: [
        ['docstring', 'readers and help()', 'no'],
        ['annotation', 'readers, type checkers', 'no'],
        ['if / raise', 'the running program', 'yes'],
      ],
    },
  ],
  edges: [{ source: 'contract', target: 'roles', label: 'who each one is for' }],
}
