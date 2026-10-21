import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/06-comprehensions/project/main.py?raw'
import session from '../../../spine/process/06-comprehensions/session.txt?raw'

export const comprehensions: Scene = ideFrame(
  'process-comprehensions',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [17, 19, 21, 23, 25], show: [[1, 1], [10, 25]], terminal: session },
  {
    id: 'process-comprehensions-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'comp-forms',
        kind: 'table',
        label: 'One expression, one collection',
        headers: ['form', 'builds'],
        values: [
          ['[expr for o in orders]', 'a list'],
          ['[… if condition]', 'a filtered list'],
          ['{expr for o in orders}', 'a set'],
          ['{k: v for k, v in …}', 'a dict'],
          ['sum(expr for o in …)', 'no list at all'],
        ],
      },
      {
        id: 'process-comprehensions-facts',
        kind: 'list',
        pills: true,
        icon: 'funnel',
        label: 'Use one when it reads as one idea',
        pattern: 'network',
        items: [
          'Two loops or an if/else inside: write the for loop',
          'Never for side effects like print()',
          '8.955 is a sale price not yet rounded to cents',
        ],
      },
    ],
  },
)
