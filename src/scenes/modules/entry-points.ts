import type { Scene } from '@graphlearning/flow'

// §3 — a module that is both a library and a program, and what __name__ is (and what happens) for each
// way of starting it. All four rows were run on the reporting project; orders.csv holds 3 teas at 4.5
// and 1 mug at 8.0, hence 21.50.
export const entryPoints: Scene = {
  id: 'entry-points',
  title: 'One module, run or imported',
  flow: 'TB',
  nodes: [
    {
      id: 'cli',
      kind: 'code',
      filename: 'orders/cli.py',
      label: `from .calc import order_total
from .loader import read_orders

def main():
    orders = read_orders("orders.csv")
    print(f"Total: {order_total(orders):.2f}")

if __name__ == "__main__":     # true only when this file is run
    main()`,
    },
    {
      id: 'runs',
      kind: 'table',
      label: 'Four ways to start it',
      headers: ['Command', '__name__ in cli.py', 'What happens'],
      values: [
        ['python orders/cli.py', '"__main__"', 'ImportError: no parent package'],
        ['python -m orders.cli', '"__main__"', 'prints Total: 21.50'],
        ['python -m orders', '"orders.cli"', '__main__.py calls main()'],
        ['import orders.cli', '"orders.cli"', 'nothing runs yet'],
      ],
    },
  ],
  edges: [{ source: 'cli', target: 'runs', label: 'how it is started' }],
}
