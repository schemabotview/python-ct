import type { Scene } from '@graphlearning/flow'

// §5 — two sets of items and every way of combining them. Every result is wrapped in sorted(),
// because a set has no order and string hashing is randomised between runs: printing a bare set of
// strings would show a different order from one run to the next.
export const setOperations: Scene = {
  id: 'set-operations',
  title: 'Sets answer membership questions',
  flow: 'TB',
  nodes: [
    {
      id: 'sets',
      kind: 'code',
      filename: 'sets.py',
      label: `ordered  = {"tea", "mug", "jar"}
in_stock = {"tea", "jar", "pot"}
len(set(["tea", "mug", "tea"]))  # 2: duplicates collapse
"tea" in ordered                 # True
type({}), type(set())            # dict and set`,
    },
    {
      id: 'ops',
      kind: 'table',
      label: 'Combining ordered and in_stock  (shown sorted)',
      headers: ['Expression', 'Meaning', 'Result'],
      values: [
        ['ordered | in_stock', 'in either', "['jar', 'mug', 'pot', 'tea']"],
        ['ordered & in_stock', 'in both', "['jar', 'tea']"],
        ['ordered - in_stock', 'ordered, not in stock', "['mug']"],
        ['in_stock - ordered', 'in stock, not ordered', "['pot']"],
        ['ordered ^ in_stock', 'in exactly one', "['mug', 'pot']"],
      ],
    },
  ],
  edges: [{ source: 'sets', target: 'ops', label: 'set operators' }],
}
