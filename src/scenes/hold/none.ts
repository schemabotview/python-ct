import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/05-none/project/main.py?raw'
import session from '../../../spine/hold/05-none/session.txt?raw'

export const none: Scene = ideFrame(
  'hold-none',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [14, 15, 18, 20], show: [[1, 2], [8, 20]], terminal: session },
  {
    id: 'hold-none-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'truthiness',
        kind: 'table',
        label: 'What counts as true',
        headers: ['value', 'bool(value)'],
        values: [
          ['0', 'False'],
          ['3', 'True'],
          ['"" (empty text)', 'False'],
          ['"ETH-250"', 'True'],
          ['None', 'False'],
          ['[] (empty list)', 'False'],
        ],
      },
      {
        id: 'hold-none-facts',
        kind: 'list',
        pills: true,
        icon: 'circleslash',
        label: 'None means “no value”',
        pattern: 'warn',
        items: [
          'There is exactly one None object',
          'Test it with is None, never == None',
          'It has no methods: None.upper() is an AttributeError',
          'True and False are the two bools; >= gives one',
        ],
      },
    ],
  },
)
