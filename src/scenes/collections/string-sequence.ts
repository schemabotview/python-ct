import type { Scene } from '@graphlearning/flow'

// §1 — a string drawn as the sequence it is: one column per character with its positive and
// negative index beneath, then the code that indexes, slices and transforms it. Slices live in the
// code card, not the table: a multi-character cell would widen its column and break the even grid.
export const stringSequence: Scene = {
  id: 'string-sequence',
  title: 'A string is a sequence of characters',
  flow: 'TB',
  nodes: [
    {
      id: 'cells',
      kind: 'table',
      label: 'sku = "tea-250g"',
      headers: ['', 't', 'e', 'a', '-', '2', '5', '0', 'g'],
      values: [
        ['index', '0', '1', '2', '3', '4', '5', '6', '7'],
        ['negative', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1'],
      ],
    },
    {
      id: 'ops',
      kind: 'code',
      filename: 'strings.py',
      label: `sku = "tea-250g"
sku[0]            # 't'
sku[-1]           # 'g'
sku[:3]           # 'tea'
sku[4:]           # '250g'
sku[2:6]          # 'a-25'
sku[::-1]         # 'g052-aet'
len(sku)          # 8
"250" in sku      # True
sku.upper()       # 'TEA-250G'
sku.split("-")    # ['tea', '250g']
sku[0] = "T"      # TypeError (immutable)`,
    },
  ],
  edges: [{ source: 'cells', target: 'ops', label: 'indexing, slicing, methods' }],
}
