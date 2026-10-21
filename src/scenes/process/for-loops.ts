import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/04-for/project/main.py?raw'
import session from '../../../spine/process/04-for/session.txt?raw'

export const forLoops: Scene = ideFrame(
  'process-for',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [20, 22, 29, 30, 32], show: [[1, 1], [19, 32]], terminal: session },
  {
    id: 'process-for-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'priced-orders',
        kind: 'table',
        label: 'orders, one pass each',
        headers: ['order', 'sku', 'qty', 'rule', 'total'],
        values: [
          ['ORD-1001', 'ETH-250', '3', '—', '$29.85'],
          ['ORD-1002', 'COL-500', '12', 'wholesale', '$178.50'],
          ['ORD-1003', 'KEN-1000', '2', '≥ $50', '$58.90'],
          ['ORD-1004', 'ETH-250', '1', '—', '$9.95'],
        ],
      },
      {
        id: 'process-for-facts',
        kind: 'list',
        icon: 'repeat',
        label: 'for runs its body once per item',
        pattern: 'network',
        items: [
          'order names each dict in turn',
          'The indented block is the body',
          'The rules from section 2, now for every order',
          'day_total is outside: it survives every pass',
        ],
      },
    ],
  },
)
