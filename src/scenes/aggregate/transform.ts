import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { aggregateTree } from './tree'
import main from '../../../spine/aggregate/07-transform/project/main.py?raw'
import session from '../../../spine/aggregate/07-transform/session.txt?raw'

export const transform: Scene = ideFrame(
  'aggregate-transform',
  'roastery-etl',
  aggregateTree,
  { file: 'main.py', code: main, show: [[1, 1], [53, 71]], highlight: [53, 61, 66, 67], terminal: session },
  {
    id: 'aggregate-transform-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'etl-flow',
        label: 'The T in ETL',
        sub: 'rows in, one summary per day out',
        pattern: 'service',
        icon: 'none',
        children: [
          { id: 't-rows', label: 'month_rows()', variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 't-group', label: 'groupby(date)', variant: 'chip', pattern: 'service', icon: 'none' },
          { id: 't-sum', label: 'summarise()', variant: 'chip', pattern: 'service', icon: 'none' },
          { id: 't-daily', label: 'daily: 31 summaries', variant: 'chip', pattern: 'network', icon: 'none' },
        ],
        edges: [
          { source: 't-rows', target: 't-group' },
          { source: 't-group', target: 't-sum' },
          { source: 't-sum', target: 't-daily' },
        ],
      },
      {
        id: 'aggregate-transform-facts',
        kind: 'list',
        icon: 'workflow',
        label: 'One function, one job',
        pattern: 'service',
        items: [
          'summarise() takes rows and returns a dict',
          'It never opens a file or prints',
          'So it can be tested with three rows by hand',
        ],
      },
    ],
  },
)
