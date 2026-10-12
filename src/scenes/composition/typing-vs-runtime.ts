import type { Scene } from '@graphlearning/flow'

// §5 — type aliases, a generic function and class, and a Protocol, then the table of what a type
// checker sees against what Python does at run time. The wrong-argument call proves the point: it
// runs, and fails only on its own arithmetic.
export const typingVsRuntime: Scene = {
  id: 'typing-vs-runtime',
  title: 'Types describe; Python does not check',
  flow: 'TB',
  nodes: [
    {
      id: 'hints',
      kind: 'code',
      filename: 'typing_tools.py',
      label: `type Price = float                    # a type alias
type Line = tuple[str, int, Price]
def total(lines: list[Line]) -> Price: ...

def first[T](items: list[T]) -> T:    # generic: the result type follows the input
    return items[0]
class Box[T]:
    def __init__(self, item: T): self.item = item

class Priced(Protocol):               # anything with this method fits
    def price(self, qty: int) -> float: ...
def order_cost(strategy: Priced, qty: int) -> float:
    return strategy.price(qty)`,
    },
    {
      id: 'checks',
      kind: 'table',
      label: 'Static checker versus running Python',
      headers: ['Code', 'Checker', 'Python at run time'],
      values: [
        ['def g(x: int): ...; g("a")', 'reports an error', 'runs until "a" + 1 fails'],
        ['def f(x: int) -> str: return x', 'reports an error', 'returns 3 unchecked'],
        ['order_cost(Bad(), 3)', 'reports no price()', 'AttributeError at the call'],
        ['isinstance(Flat(), Priced)', 'n/a', 'needs @runtime_checkable'],
      ],
    },
  ],
  edges: [{ source: 'hints', target: 'checks', label: 'two different audiences' }],
}
