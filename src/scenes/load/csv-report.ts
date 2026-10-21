import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { loadTree } from './tree'
import main from '../../../spine/load/01-csv-report/project/main.py?raw'
import session from '../../../spine/load/01-csv-report/session.txt?raw'

export const csvReport: Scene = ideFrame(
  'load-csv-report',
  'roastery-etl',
  loadTree({ out: [{ name: 'daily_report.csv', state: 'new' }] }),
  { file: 'main.py', code: main, show: [[1, 1], [72, 82]], highlight: [75, 78, 79, 81], terminal: session },
  {
    id: 'load-csv-report-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'load-csv-report-facts',
        kind: 'list',
        icon: 'file',
        label: 'csv.writer',
        pattern: 'storage',
        items: [
          'Open with "w", newline="" and an encoding',
          'writerow() takes a list and quotes what needs it',
          'The header row first, then one row per day',
          'A Decimal is written as its text: 329.00, exact',
          'mkdir(exist_ok=True) makes data/out once',
        ],
      },
      { id: 'load-csv-report-note', kind: 'note', pattern: 'network', label: '32 lines: a header and 31 days. Generated files live in data/out, apart from the raw data' },
    ],
  },
)
