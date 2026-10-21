import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { day, extractTree } from './tree'
import main from '../../../spine/extract/06-validating/project/main.py?raw'
import session from '../../../spine/extract/06-validating/session.txt?raw'

export const validating: Scene = ideFrame(
  'extract-validating',
  'roastery-etl',
  extractTree([day(1), day(2), day(3)]),
  { file: 'main.py', code: main, highlight: [14, 16, 18, 26, 29, 32], show: [[1, 1], [14, 19], [22, 33]], terminal: session },
  {
    id: 'extract-validating-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'day-one',
        kind: 'table',
        label: 'orders-2026-10-01.csv',
        headers: ['line', 'order', 'outcome'],
        values: [
          ['2', 'ORD-1001', 'kept'],
          ['3', 'ORD-1002', 'kept'],
          ['4', 'ORD-1003', 'kept'],
          ['5', 'ORD-1004', "rejected: 'three'"],
          ['6', 'ORD-1005', 'rejected: PER-250'],
          ['7', 'ORD-1006', 'kept'],
        ],
      },
      {
        id: 'extract-validating-facts',
        kind: 'list',
        icon: 'shieldcheck',
        label: 'Keep the good, report the bad',
        pattern: 'network',
        items: [
          'validate() returns a clean row or raises InvalidRow',
          'The clean row has a real int quantity',
          'Line numbers count the header as line 1',
          'Every rejection is reported, never dropped silently',
        ],
      },
    ],
  },
)
