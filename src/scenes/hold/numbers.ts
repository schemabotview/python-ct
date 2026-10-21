import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/02-numbers/project/main.py?raw'
import session from '../../../spine/hold/02-numbers/session.txt?raw'

export const numbers: Scene = ideFrame(
  'hold-numbers',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [7, 8, 9, 10, 11], terminal: session },
  {
    id: 'hold-numbers-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'int-float',
        kind: 'table',
        label: 'int and float',
        headers: ['', 'int', 'float'],
        values: [
          ['holds', 'whole numbers', 'fractions'],
          ['size', 'any: 2 ** 100 exact', '64 bits, ~16 digits'],
          ['stored as', 'exact digits', 'a binary fraction'],
          ['0.1 is', '—', 'not exactly 0.1'],
          ['use for', 'counts, quantities', 'measurements'],
        ],
      },
      {
        id: 'operators',
        kind: 'table',
        label: 'Dividing 3 by 2',
        headers: ['operator', 'means', 'result'],
        values: [
          ['/', 'true division', '1.5 (a float)'],
          ['//', 'floor division', '1'],
          ['%', 'remainder', '1'],
          ['**', 'power', '2 ** 100'],
        ],
      },
      { id: 'hold-numbers-note', kind: 'note', pattern: 'warn', label: '9.95 × 3 printed 29.849999999999998 — a float cannot hold a price exactly' },
    ],
  },
)
