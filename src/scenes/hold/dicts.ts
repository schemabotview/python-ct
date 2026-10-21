import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/08-dicts/project/main.py?raw'
import session from '../../../spine/hold/08-dicts/session.txt?raw'

export const dicts: Scene = ideFrame(
  'hold-dicts',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [5, 10, 12, 14, 15, 17], terminal: session },
  {
    id: 'hold-dicts-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'catalogue-table',
        kind: 'table',
        label: 'catalogue, after line 15',
        headers: ['key: sku', 'value: price'],
        values: [
          ['ETH-250', 'Decimal("9.95")'],
          ['COL-500', 'Decimal("17.50")'],
          ['KEN-1000', 'Decimal("31.00")'],
          ['BRA-500', 'Decimal("16.25")'],
        ],
      },
      {
        id: 'hold-dicts-facts',
        kind: 'list',
        icon: 'key',
        label: 'A dict maps keys to values',
        pattern: 'network',
        items: [
          'order["sku"] reads a field by name, not position',
          'd[key] for a missing key is a KeyError',
          'd.get(key) gives None instead',
          'Keys keep the order they were added in',
          'A lookup is one hash, not a scan of every key',
        ],
      },
    ],
  },
)
