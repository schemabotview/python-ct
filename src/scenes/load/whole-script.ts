import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { loadTree } from './tree'
import main from '../../../spine/load/06-whole-script/project/main.py?raw'
import session from '../../../spine/load/06-whole-script/session.txt?raw'

export const wholeScript: Scene = ideFrame(
  'load-whole-script',
  'roastery-etl',
  loadTree({ schema: true, out: [{ name: 'daily_report.csv', state: 'new' }, { name: 'rejected.csv', state: 'new' }, { name: 'warehouse.db' }] }),
  { file: 'main.py', code: main, show: [[1, 1], [105, 123]], highlight: [105, 108, 109, 110, 123], terminal: session },
  {
    id: 'load-whole-script-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'etl',
        label: 'Extract, transform, load',
        sub: 'one run, three outputs',
        pattern: 'network',
        icon: 'none',
        children: [
          { id: 'e', label: 'month_rows(): 31 files', variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 't', label: 'daily_summaries(): 31 days', variant: 'chip', pattern: 'service', icon: 'none' },
          { id: 'l', label: 'load() and two CSV files', variant: 'chip', pattern: 'network', icon: 'none' },
        ],
        edges: [
          { source: 'e', target: 't' },
          { source: 't', target: 'l' },
        ],
      },
      {
        id: 'outputs',
        kind: 'table',
        label: 'data/out after one run',
        headers: ['file', 'holds'],
        values: [
          ['daily_report.csv', 'one row per day'],
          ['rejected.csv', 'every bad row, and why'],
          ['warehouse.db', 'every priced order line'],
        ],
      },
    ],
  },
)
