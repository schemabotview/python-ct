import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { day, extractTree } from './tree'
import main from '../../../spine/extract/04-csv/project/main.py?raw'
import session from '../../../spine/extract/04-csv/session.txt?raw'

export const csvRows: Scene = ideFrame(
  'extract-csv',
  'roastery-etl',
  extractTree([day(1), day(2), day(3)]),
  { file: 'main.py', code: main, highlight: [7, 8, 10, 13], terminal: session },
  {
    id: 'extract-csv-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'extract-csv-facts',
        kind: 'list',
        icon: 'table',
        label: 'csv.DictReader',
        pattern: 'storage',
        items: [
          'The header row becomes the keys of every row',
          'Each row is a dict: row["sku"], not row[3]',
          '"Luna Café, Ltd" stays one field: the quotes protect it',
          'newline="" lets the csv module handle line endings',
          'Every value is a str, "three" included',
        ],
      },
      { id: 'extract-csv-note', kind: 'note', pattern: 'warn', label: 'line.split(",") would cut "Luna Café, Ltd" in two — let csv parse CSV' },
    ],
  },
)
