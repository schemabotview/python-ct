import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { aggregateTree } from './tree'
import main from '../../../spine/aggregate/01-grouping/project/main.py?raw'
import session from '../../../spine/aggregate/01-grouping/session.txt?raw'

export const grouping: Scene = ideFrame(
  'aggregate-grouping',
  'roastery-etl',
  aggregateTree,
  { file: 'main.py', code: main, show: [[1, 1], [51, 62]], highlight: [52, 55, 57], terminal: session },
  {
    id: 'aggregate-grouping-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'aggregate-grouping-facts',
        kind: 'list',
        icon: 'sigma',
        label: 'Grouping with a dict',
        pattern: 'service',
        items: [
          'One key per product; its value is a running total',
          'A new product needs its key created first',
          'revenue[sku] += row["total"] adds this row',
          'One pass over 5,797 rows leaves four totals',
          'Totals are after Course 5\u2019s discounts',
        ],
      },
      { id: 'aggregate-grouping-note', kind: 'note', pattern: 'network', label: 'month_rows() is Course 6, folded above: it streams October and sets the 79 bad rows aside' },
    ],
  },
)
