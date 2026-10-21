import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { loadTree } from './tree'
import main from '../../../spine/load/02-formatting/project/main.py?raw'
import session from '../../../spine/load/02-formatting/session.txt?raw'

export const formatting: Scene = ideFrame(
  'load-formatting',
  'roastery-etl',
  loadTree({}),
  { file: 'main.py', code: main, show: [[1, 1], [72, 85]], highlight: [76, 78, 79, 83, 84, 85], terminal: session },
  {
    id: 'load-formatting-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'format-spec',
        kind: 'table',
        label: 'After the colon: the format spec',
        headers: ['spec', 'means'],
        values: [
          ['<10', 'left-aligned in 10 characters'],
          ['>6', 'right-aligned in 6'],
          ['^11', 'centred in 11'],
          [',.2f', 'thousands commas, 2 decimals'],
          ['.1%', 'a percentage, 1 decimal'],
          ['$>14', 'right-aligned, padded with $'],
          ['=', 'the expression and its value'],
        ],
      },
      { id: 'load-formatting-note', kind: 'note', pattern: 'storage', label: 'Formatting changes how a value is shown, never the value: the Decimal is still exact' },
    ],
  },
)
