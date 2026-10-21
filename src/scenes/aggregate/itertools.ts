import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { aggregateTree } from './tree'
import main from '../../../spine/aggregate/06-itertools/project/main.py?raw'
import session from '../../../spine/aggregate/06-itertools/session.txt?raw'

export const itertoolsScene: Scene = ideFrame(
  'aggregate-itertools',
  'roastery-etl',
  aggregateTree,
  { file: 'main.py', code: main, show: [[1, 1], [6, 6], [52, 63]], highlight: [6, 55, 60, 62], terminal: session },
  {
    id: 'aggregate-itertools-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'iter-tools',
        kind: 'table',
        label: 'Three tools, no lists built',
        headers: ['tool', 'does'],
        values: [
          ['groupby(rows, key)', 'runs of equal keys'],
          ['islice(it, 3)', 'the first three, lazily'],
          ['chain(a, b)', 'a, then b, end to end'],
        ],
      },
      {
        id: 'aggregate-itertools-facts',
        kind: 'list',
        icon: 'link',
        label: 'Iterators are read once',
        pattern: 'service',
        items: [
          'groupby joins neighbours only: sort the rows first',
          'October is read in date order, so days come out whole',
          'A spent generator yields nothing: make a fresh one',
        ],
      },
    ],
  },
)
