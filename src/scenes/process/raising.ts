import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/11-raising/project/main.py?raw'
import session from '../../../spine/process/11-raising/session.txt?raw'

export const raising: Scene = ideFrame(
  'process-raising',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [3, 8, 9, 17, 19], terminal: session },
  {
    id: 'process-raising-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'process-raising-facts',
        kind: 'list',
        icon: 'ban',
        label: 'InvalidOrder: our own error',
        pattern: 'warn',
        items: [
          'class InvalidOrder(ValueError): a new kind of ValueError',
          'raise stops validate() and hands the error up',
          'except InvalidOrder catches ours, by name',
          'ORD-1001 is valid, so nothing is printed',
          'Uncaught, it stops the run and names itself',
        ],
      },
      { id: 'process-raising-note', kind: 'note', pattern: 'warn', label: 'Without the check, -2 bags price as -35.00: a silent refund' },
    ],
  },
)
