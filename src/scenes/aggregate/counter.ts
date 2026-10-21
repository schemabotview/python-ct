import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { aggregateTree } from './tree'
import main from '../../../spine/aggregate/02-counter/project/main.py?raw'
import session from '../../../spine/aggregate/02-counter/session.txt?raw'

export const counter: Scene = ideFrame(
  'aggregate-counter',
  'roastery-etl',
  aggregateTree,
  { file: 'main.py', code: main, show: [[1, 1], [5, 5], [52, 64]], highlight: [5, 53, 54, 55, 62], terminal: session },
  {
    id: 'aggregate-counter-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'missing-keys',
        kind: 'table',
        label: 'Reading a key that is not there',
        headers: ['container', 'gives'],
        values: [
          ['dict', 'KeyError'],
          ['defaultdict(Decimal)', 'Decimal(), which is 0'],
          ['defaultdict(set)', 'set(), an empty set'],
          ['Counter', '0, and adds nothing'],
        ],
      },
      {
        id: 'aggregate-counter-facts',
        kind: 'list',
        icon: 'hash',
        label: 'collections does the bookkeeping',
        pattern: 'service',
        items: [
          'defaultdict calls its factory for a missing key',
          'Counter counts, and most_common() ranks the counts',
          'A set per product counts distinct customers',
        ],
      },
    ],
  },
)
