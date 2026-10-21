import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/03-match/project/main.py?raw'
import session from '../../../spine/process/03-match/session.txt?raw'

export const matchRows: Scene = ideFrame(
  'process-match',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [5, 7, 10], terminal: session },
  {
    id: 'process-match-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'patterns',
        kind: 'table',
        label: 'Patterns, tried top to bottom',
        headers: ['case', 'matches'],
        values: [
          ['"sale" … if qty > 0', 'a sale, positive int qty'],
          ['"refund", order, amount', 'a refund: this row'],
          ['{"type": kind}', 'any other row type'],
          ['_', 'anything at all'],
        ],
      },
      {
        id: 'process-match-facts',
        kind: 'list',
        icon: 'regex',
        label: 'match checks shape and binds names',
        pattern: 'network',
        items: [
          'A mapping pattern needs its keys; extra keys are fine',
          'order_id and amount are bound by the match itself',
          'str(sku) and int(qty) also check the type',
          'if qty > 0 is a guard on the pattern',
          'New in Python 3.10',
        ],
      },
    ],
  },
)
