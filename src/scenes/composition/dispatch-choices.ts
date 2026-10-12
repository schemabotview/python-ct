import type { Scene } from '@graphlearning/flow'

// §6 — the same three-way pricing choice written four ways (if, match, a dict of functions, singledispatch
// in the card below) and a table for choosing; the closing line is the plain function that needed none
// of them.
export const dispatchChoices: Scene = {
  id: 'dispatch-choices',
  title: 'Choosing how to dispatch',
  flow: 'TB',
  nodes: [
    {
      id: 'ways',
      kind: 'code',
      filename: 'dispatch.py',
      label: `# 1. a dictionary of functions: easy to extend, one lookup
STRATS = {"unit": price_per_unit, "bulk": price_bulk, "flat": price_flat}
def cost(kind, qty): return STRATS[kind](qty)    # KeyError: 'free' if unknown

# 2. match: every case in one place, a default for the unknown
match kind:
    case "unit": ...
    case _: raise ValueError(f"unknown pricing {kind!r}")

# 3. dispatch on the TYPE of the argument
@functools.singledispatch
def fmt(x): return str(x)
@fmt.register
def _(x: float): return f"{x:.2f}"
fmt(3.14159), fmt([1.5, 2.25])    # '3.14', '1.50, 2.25'`,
    },
    {
      id: 'choose',
      kind: 'table',
      label: 'Choosing',
      headers: ['Situation', 'Use'],
      values: [
        ['one behaviour, no variation', 'a plain function'],
        ['a few fixed cases', 'if / elif or match'],
        ['cases added by other code', 'a dict or registry'],
        ['behaviour depends on argument type', 'singledispatch'],
        ['behaviour carries state', 'a class'],
      ],
    },
  ],
  edges: [{ source: 'ways', target: 'choose', label: 'when to use which' }],
}
