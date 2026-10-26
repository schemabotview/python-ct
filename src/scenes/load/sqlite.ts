import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/load/04-sqlite/project/main.py?raw'
import session from '../../../spine/load/04-sqlite/session.txt?raw'

// §4 — sqlite3: the warehouse table, loaded in one transaction, money in whole cents. The count, the
// cents and the second run's IntegrityError are the session's.
export const loadSqlite: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days', out: ['daily_report.csv', 'summary.json', 'warehouse.db'], fresh: ['warehouse.db'] }),
  editor: { file: 'main.py', code, highlight: [...linesFrom(code, 'with sqlite3.connect', 'result = conn.execute')], show: [[lineOf(code, 'SCHEMA = '), lineOf(code, 'TOTALS = ')], [lineOf(code, 'def load_warehouse'), lineOf(code, 'return result')], [lineOf(code, 'count, cents'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'load', title: 'One transaction: all 163 rows, or none', icon: 'database', tone: 'ingest', children: [
        { type: 'item', id: 'lines', title: '163 priced lines', sub: 'total: Decimal("4460.90")…', icon: 'file' },
        { type: 'table', id: 'order_lines', title: 'order_lines', tone: 'store', columns: ['column', 'type'], rows: [{ cells: ['id', 'TEXT PRIMARY KEY'], tone: 'store' }, ['date', 'TEXT'], ['customer', 'TEXT'], ['sku', 'TEXT'], ['quantity', 'INTEGER'], ['total_cents', 'INTEGER']] },
      ],
    },
    {
      type: 'table', id: 'runs', title: 'Run it twice', tone: 'ingest', columns: ['run', 'result'], rows: [
        ['first', '163 lines, 1157888 cents'], { cells: ['second', 'IntegrityError: UNIQUE constraint failed'], tone: 'consume' },
      ],
    },
{
      type: 'table', id: 'with', title: 'with sqlite3.connect(path) as conn:', tone: 'ingest', columns: ['when', 'the table gets'], rows: [
        ['the block finishes', 'commit: all 163 rows'], { cells: ['anything raises', 'roll back: none of them'], tone: 'consume' }, ['after the block', 'conn is still open: close()'],
      ],
    },
        { type: 'note', id: 'sq-note', tone: 'ingest', text: 'Money goes in as whole cents: 11578.88 is 1157888, an integer, exact in every database.' },
  ],
  edges: [{ from: 'lines', to: 'order_lines', label: 'executemany' }],
})
