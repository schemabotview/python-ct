import type { Scene } from '@graphlearning/flow'

// §6 — three special methods on the order line and what each is used for. A list prints its items with
// repr, while print() uses str, which is why both methods exist.
export const reprTruth: Scene = {
  id: 'repr-truth',
  title: 'repr for programmers, str for users',
  flow: 'TB',
  nodes: [
    {
      id: 'methods',
      kind: 'code',
      filename: 'representations.py',
      label: `class LineItem:
    def __init__(self, item, qty, price):
        self.item, self.qty, self.price = item, qty, price
    def __repr__(self): return f"LineItem({self.item!r}, {self.qty})"
    def __str__(self): return f"{self.qty} x {self.item}"
    def __bool__(self): return self.qty > 0

x = LineItem("tea", 3, 4.5)
repr(x)                          # LineItem('tea', 3)
str(x)                           # 3 x tea
[x]                              # [LineItem('tea', 3)]: lists show repr
bool(LineItem("tea", 0, 4.5))    # False`,
    },
    {
      id: 'who',
      kind: 'table',
      label: 'Which special method runs',
      headers: ['Expression', 'Calls'],
      values: [
        ['repr(x), the prompt, a list', '__repr__'],
        ['str(x), print(x), f"{x}"', '__str__, else __repr__'],
        ['bool(x), if x:', '__bool__, else __len__'],
        ['dir(x), vars(x)', 'inspect attributes'],
      ],
    },
  ],
  edges: [{ source: 'methods', target: 'who', label: 'who calls what' }],
}
