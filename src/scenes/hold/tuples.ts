import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/07-tuples/project/main.py?raw'
import session from '../../../spine/hold/07-tuples/session.txt?raw'

export const tuples: Scene = ideFrame(
  'hold-tuples',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [3, 9, 12, 14], terminal: session },
  {
    id: 'hold-tuples-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'orders-table',
        kind: 'table',
        label: 'orders: a list of tuples',
        headers: ['', '[0] id', '[1] sku', '[2] qty'],
        values: [
          ['orders[0]', 'ORD-1001', 'ETH-250', '3'],
          ['orders[1]', 'ORD-1002', 'COL-500', '1'],
          ['orders[2]', 'ORD-1003', 'ETH-250', '2'],
        ],
      },
      {
        id: 'hold-tuples-facts',
        kind: 'list',
        icon: 'lock',
        label: 'A tuple is a fixed record',
        pattern: 'storage',
        items: [
          'One row: its fields keep their positions',
          'Unpack it: order_id, sku, quantity = row',
          'first, *rest = orders collects the remainder',
          'It cannot change: item assignment is a TypeError',
          'A list holds many rows; a tuple is one row',
        ],
      },
    ],
  },
)
