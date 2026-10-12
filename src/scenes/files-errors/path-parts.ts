import type { Scene } from '@graphlearning/flow'

// §1 — pathlib in use, and the parts of one path. The PosixPath name is what a Linux or macOS machine
// prints; Windows prints WindowsPath, which the slide says so no learner thinks the code is wrong.
export const pathParts: Scene = {
  id: 'path-parts',
  title: 'A path is an object with parts',
  flow: 'TB',
  nodes: [
    {
      id: 'ops',
      kind: 'code',
      filename: 'paths.py',
      label: `from pathlib import Path
orders = Path("data") / "orders.csv"       # / joins path parts
Path("data").mkdir(exist_ok=True)           # create a folder
orders.write_text("id,item\\n", encoding="utf-8")
orders.exists()                             # True
sorted(p.name for p in Path("data").glob("*.csv"))   # ['orders.csv']
Path("data/none.csv").read_text()           # FileNotFoundError`,
    },
    {
      id: 'parts',
      kind: 'table',
      label: 'Parts of Path("data") / "orders.csv"',
      headers: ['Expression', 'Result'],
      values: [
        ['str(orders)', "'data/orders.csv'"],
        ['orders.name', "'orders.csv'"],
        ['orders.stem', "'orders'"],
        ['orders.suffix', "'.csv'"],
        ['orders.parent', "PosixPath('data')"],
        ['orders.with_suffix(".json")', "PosixPath('data/orders.json')"],
      ],
    },
  ],
  edges: [{ source: 'ops', target: 'parts', label: 'taking a path apart' }],
}
