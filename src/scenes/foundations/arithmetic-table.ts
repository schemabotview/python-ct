import type { Scene } from '@graphlearning/flow'

// §4 — results are the content here, so they are a table rather than a diagram. The last row is
// the one that surprises: a float stores the nearest binary value, not the decimal that was typed.
export const arithmeticTable: Scene = {
  id: 'arithmetic-table',
  title: 'What each expression produces',
  flow: 'TB',
  nodes: [
    {
      id: 'results',
      kind: 'table',
      label: 'Expressions and their results',
      headers: ['Expression', 'Result', 'Type'],
      values: [
        ['7 / 2', '3.5', 'float'],
        ['10 / 2', '5.0', 'float'],
        ['7 // 2', '3', 'int'],
        ['7 % 2', '1', 'int'],
        ['2 ** 10', '1024', 'int'],
        ['int(3.9)', '3', 'int'],
        ['0.1 + 0.2', '0.30000000000000004', 'float'],
      ],
    },
  ],
  edges: [],
}
