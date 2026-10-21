import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/10-copying/project/main.py?raw'
import session from '../../../spine/hold/10-copying/session.txt?raw'

export const copying: Scene = ideFrame(
  'hold-copying',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [11, 12, 13, 14, 15], terminal: session },
  {
    id: 'hold-copying-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'hold-copying-model',
        label: 'After line 15',
        sub: 'names → dicts (by customer) → lists of line items',
        pattern: 'network',
        icon: 'none',
        children: [
          { id: 'c-order', label: 'order', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'c-same', label: 'same', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'c-shallow', label: 'shallow', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'c-deep', label: 'deep', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'd-order', label: "dict · 'omar'", variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 'd-shallow', label: "dict · 'maya'", variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 'd-deep', label: "dict · 'maya'", variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 'l-shared', label: "list · 2 items", variant: 'chip', pattern: 'warn', icon: 'none' },
          { id: 'l-deep', label: "list · 1 item", variant: 'chip', pattern: 'storage', icon: 'none' },
        ],
        edges: [
          { source: 'c-order', target: 'd-order' },
          { source: 'c-same', target: 'd-order' },
          { source: 'c-shallow', target: 'd-shallow' },
          { source: 'c-deep', target: 'd-deep' },
          { source: 'd-order', target: 'l-shared' },
          { source: 'd-shallow', target: 'l-shared' },
          { source: 'd-deep', target: 'l-deep' },
        ],
      },
      {
        id: 'copy-kinds',
        kind: 'table',
        label: 'Three ways to “copy”',
        headers: ['', 'new dict?', 'new lines?'],
        values: [
          ['same = order', 'no', 'no'],
          ['order.copy()', 'yes', 'no — shared'],
          ['copy.deepcopy(order)', 'yes', 'yes'],
        ],
      },
    ],
  },
)
