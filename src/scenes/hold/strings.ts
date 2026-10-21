import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/04-strings/project/main.py?raw'
import session from '../../../spine/hold/04-strings/session.txt?raw'

export const strings: Scene = ideFrame(
  'hold-strings',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [9, 15, 16], show: [[1, 2], [8, 21]], terminal: session },
  {
    id: 'hold-strings-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'sku-index',
        kind: 'table',
        label: 'sku = "ETH-250"',
        headers: ['', 'E', 'T', 'H', '-', '2', '5', '0'],
        values: [
          ['index', '0', '1', '2', '3', '4', '5', '6'],
          ['from end', '-7', '-6', '-5', '-4', '-3', '-2', '-1'],
        ],
      },
      {
        id: 'hold-strings-facts',
        kind: 'list',
        pills: true,
        icon: 'scissors',
        label: 'A string is a sequence of characters',
        pattern: 'network',
        items: [
          'sku[0] is "E"; sku[-1] counts from the end',
          'sku[:3] is "ETH": a slice stops before its end',
          'A string never changes: upper() returns a new one',
          'f"…{total}" puts values into text',
          '"250" * 2 repeats text — int("250") first',
        ],
      },
    ],
  },
)
