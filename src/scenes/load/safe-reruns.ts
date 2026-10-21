import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { loadTree } from './tree'
import main from '../../../spine/load/05-safe-reruns/project/main.py?raw'
import session from '../../../spine/load/05-safe-reruns/session.txt?raw'

export const safeReruns: Scene = ideFrame(
  'load-safe-reruns',
  'roastery-etl',
  loadTree({ schema: true, out: [{ name: 'order_lines.csv', state: 'new' }, { name: 'warehouse.db' }] }),
  { file: 'main.py', code: main, show: [[1, 1], [90, 107]], highlight: [90, 93, 98, 102], terminal: session },
  {
    id: 'load-safe-reruns-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'rerun-table',
        kind: 'table',
        label: 'Run it twice',
        headers: ['', 'naive', 'here'],
        values: [
          ['database', 'IntegrityError', 'DELETE + INSERT'],
          ['file', 'half-written', '.tmp + replace()'],
          ['second run', 'fails', 'same 5,797 rows'],
        ],
      },
      {
        id: 'load-safe-reruns-facts',
        kind: 'list',
        icon: 'repeat',
        label: 'Idempotent: safe to run again',
        pattern: 'storage',
        items: [
          'A failed or repeated run must never corrupt the output',
          'replace() swaps the new file in all at once',
          'records() and connect() are section 4\u2019s code, folded',
        ],
      },
    ],
  },
)
