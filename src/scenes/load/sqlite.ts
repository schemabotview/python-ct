import type { Scene } from '@graphlearning/flow'
import { ideFrame, trim } from '../ide'
import { loadTree } from './tree'
import main from '../../../spine/load/04-sqlite/project/main.py?raw'
import session from '../../../spine/load/04-sqlite/session.txt?raw'
import schema from '../../../spine/load/04-sqlite/project/schema.sql?raw'

export const sqliteScene: Scene = ideFrame(
  'load-sqlite',
  'roastery-etl',
  loadTree({ schema: true, out: [{ name: 'warehouse.db', state: 'new' }] }),
  { file: 'main.py', code: main, show: [[1, 1], [73, 91]], highlight: [74, 78, 80, 81, 87, 89], terminal: session },
  {
    id: 'load-sqlite-pane',
    label: 'side',
    bare: true,
    children: [
      { id: 'schema-sql', kind: 'code', filename: 'schema.sql', label: trim(schema), hug: true, pattern: 'storage' },
      {
        id: 'load-sqlite-facts',
        kind: 'list',
        icon: 'database',
        label: 'sqlite3: a database in one file',
        pattern: 'storage',
        items: [
          '? placeholders: values are passed, never pasted into SQL',
          'with con: commits on success, rolls back on any error',
          'ORD-9001 and the duplicate were undone together',
          'The four products add up to 5,797 lines',
        ],
      },
    ],
  },
)
