import type { Scene } from '@graphlearning/flow'

// §7 — a container built from just __len__ and __getitem__, and an operator type that declines types
// it does not understand by returning NotImplemented. sum() needs an explicit start because it begins
// from the integer 0.
export const containerOperators: Scene = {
  id: 'container-operators',
  title: 'Syntax calls special methods',
  flow: 'TB',
  nodes: [
    {
      id: 'container',
      kind: 'code',
      filename: 'container.py',
      label: `class Order:
    def __init__(self, lines): self.lines = list(lines)
    def __len__(self): return len(self.lines)
    def __getitem__(self, i): return self.lines[i]

o = Order(["tea", "mug", "jar"])
len(o), o[0], o[-1]            # 3 tea jar
list(o), "mug" in o, max(o)    # ['tea', 'mug', 'jar'] True tea`,
    },
    {
      id: 'operator',
      kind: 'code',
      filename: 'operator.py',
      label: `@dataclass(frozen=True)
class Money:
    cents: int
    def __add__(self, other):
        if not isinstance(other, Money): return NotImplemented
        return Money(self.cents + other.cents)

Money(450) + Money(800)               # Money(cents=1250)
Money(1) + 5                          # TypeError: unsupported operand type(s)
sum([Money(1), Money(2)], Money(0))   # Money(cents=3)`,
    },
  ],
  edges: [{ source: 'container', target: 'operator', label: 'and for operators' }],
}
