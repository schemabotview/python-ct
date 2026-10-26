import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/load/06-whole-script/project/main.py?raw'
import session from '../../../spine/load/06-whole-script/session.txt?raw'

// §6 — the whole script: main() runs extract, validate, transform, aggregate and load in order; the
// side pane is the pipeline map, every stage lit, each mapped to its function. Output is the session's.
export const loadWholeScript: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days', out: ['daily_report.csv', 'summary.json', 'warehouse.db'], fresh: [] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'paths = sorted', 'count, cents'), show: [[lineOf(code, 'def main'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'stages', title: 'Every stage, and the function that does it', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'extract', title: 'Extract', sub: 'iter_rows, read_text', icon: 'file' },
        { type: 'item', id: 'validate', title: 'Validate', sub: 'parse_row, InvalidOrder', icon: 'check' },
        { type: 'item', id: 'transform', title: 'Transform', sub: 'price_line, priced_lines', icon: 'workflow' },
        { type: 'item', id: 'aggregate', title: 'Aggregate', sub: 'summarise', icon: 'chart' },
        { type: 'item', id: 'load', title: 'Load', sub: 'write_report, write_summary, load_warehouse', icon: 'database', tone: 'store' },
      ],
    },
    { type: 'table', id: 'report', title: 'What main() reports', tone: 'store', columns: ['', ''], rows: [['October', '11578.88'], ['priced', '163 lines'], ['rejected', '13 rows']] },
    { type: 'table', id: 'sinks', title: 'data/out', tone: 'store', columns: ['file', 'for'], rows: [['daily_report.csv', 'people'], ['summary.json', 'programs'], ['warehouse.db', 'queries']] },
  ],
  edges: [{ from: 'extract', to: 'validate' }, { from: 'validate', to: 'transform' }, { from: 'transform', to: 'aggregate' }, { from: 'aggregate', to: 'load' }],
})
