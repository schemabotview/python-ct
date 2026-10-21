import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/10-exceptions/project/main.py?raw'
import session from '../../../spine/process/10-exceptions/session.txt?raw'

export const exceptions: Scene = ideFrame(
  'process-exceptions',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [19, 21, 23, 25], show: [[1, 1], [17, 29]], terminal: session },
  {
    id: 'process-exceptions-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'bad-rows',
        kind: 'table',
        label: 'rows, folded above',
        headers: ['row', 'sku', 'qty', 'outcome'],
        values: [
          ['ORD-1001', 'ETH-250', '"3"', 'priced'],
          ['ORD-1005', 'PER-250', '"1"', 'KeyError'],
          ['ORD-1006', 'COL-500', '"two"', 'ValueError'],
          ['ORD-1003', 'KEN-1000', '"2"', 'priced'],
        ],
      },
      {
        id: 'process-exceptions-facts',
        kind: 'list',
        pills: true,
        icon: 'shieldcheck',
        label: 'try / except / else',
        pattern: 'storage',
        items: [
          'try: the line that may fail',
          'except KeyError: only that error, handled',
          'else: runs only when nothing was raised',
          'One bad row is recorded, and the run goes on',
          'Never a bare except: it hides your own bugs',
        ],
      },
    ],
  },
)
