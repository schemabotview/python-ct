import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { aggregateTree } from './tree'
import main from '../../../spine/aggregate/05-dates/project/main.py?raw'
import session from '../../../spine/aggregate/05-dates/session.txt?raw'

export const dates: Scene = ideFrame(
  'aggregate-dates',
  'roastery-etl',
  aggregateTree,
  { file: 'main.py', code: main, show: [[1, 1], [6, 6], [53, 65]], highlight: [6, 56, 59, 62, 65], terminal: session },
  {
    id: 'aggregate-dates-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'iso-weeks',
        kind: 'table',
        label: 'October 2026, in ISO weeks',
        headers: ['week', 'Monday to Sunday', 'October days'],
        values: [
          ['40', 'Sep 28 – Oct 4', '4'],
          ['41', 'Oct 5 – Oct 11', '7'],
          ['42', 'Oct 12 – Oct 18', '7'],
          ['43', 'Oct 19 – Oct 25', '7'],
          ['44', 'Oct 26 – Nov 1', '6'],
        ],
      },
      {
        id: 'aggregate-dates-facts',
        kind: 'list',
        icon: 'calendar',
        label: 'Text becomes a date',
        pattern: 'service',
        items: [
          'date.fromisoformat() parses "2026-10-22"',
          'strftime("%A") names the weekday',
          'Subtracting dates gives a timedelta',
        ],
      },
    ],
  },
)
