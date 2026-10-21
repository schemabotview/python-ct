import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/06-lists/project/main.py?raw'
import session from '../../../spine/hold/06-lists/session.txt?raw'

export const lists: Scene = ideFrame(
  'hold-lists',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [3, 4, 6, 7, 11], terminal: session },
  {
    id: 'hold-lists-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'skus-table',
        kind: 'table',
        label: 'After the two appends',
        headers: ['index', 'skus', 'quantities'],
        values: [
          ['0 · -5', 'ETH-250', '3'],
          ['1 · -4', 'COL-500', '1'],
          ['2 · -3', 'ETH-250', '2'],
          ['3 · -2', 'KEN-1000', '1'],
          ['4 · -1', 'BRA-500', '4'],
        ],
      },
      {
        id: 'hold-lists-facts',
        kind: 'list',
        icon: 'layers',
        label: 'A list is ordered and changeable',
        pattern: 'network',
        items: [
          'append() grows it in place',
          'len, sum, in and count read it',
          'skus[1:3] is a new list of items 1 and 2',
          'Five items: index 5 is an IndexError',
        ],
      },
      { id: 'hold-lists-note', kind: 'note', pattern: 'warn', label: 'Two lists that must stay in step are one record split in two' },
    ],
  },
)
