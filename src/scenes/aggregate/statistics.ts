import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { aggregateTree } from './tree'
import main from '../../../spine/aggregate/04-statistics/project/main.py?raw'
import session from '../../../spine/aggregate/04-statistics/session.txt?raw'

export const statistics: Scene = ideFrame(
  'aggregate-statistics',
  'roastery-etl',
  aggregateTree,
  { file: 'main.py', code: main, show: [[1, 1], [5, 6], [53, 64]], highlight: [5, 6, 58, 60, 62, 64], terminal: session },
  {
    id: 'aggregate-statistics-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'rounding',
        kind: 'table',
        label: 'Rounding 2.675 to cents',
        headers: ['how', 'gives'],
        values: [
          ['round(2.675, 2), a float', '2.67'],
          ['Decimal, ROUND_HALF_UP', '2.68'],
          ['round(Decimal, 2)', '2.68, half to even'],
          ['round(0.5), round(1.5)', '0 and 2'],
        ],
      },
      {
        id: 'aggregate-statistics-facts',
        kind: 'list',
        icon: 'barchart',
        label: 'Averages, and when to round',
        pattern: 'service',
        items: [
          'Median $48.75 is below the mean: big orders pull it up',
          'statistics works on Decimals and keeps them exact',
          'Round once, at the end, never in the middle',
          'math.ceil: whole boxes, always rounded up',
        ],
      },
    ],
  },
)
