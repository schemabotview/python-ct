import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/load/02-formatting/project/main.py?raw'
import session from '../../../spine/load/02-formatting/session.txt?raw'

// §2 — f-string format specs: the terminal report lines up. The table and the REPL pair are the
// session's.
export const loadFormatting: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days', out: ['daily_report.csv'], fresh: [] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'print(f"{\'product\'', 'print(f"{\'total\''), show: [[lineOf(code, 'def write_report'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'spec', title: 'f"{amount:>12,.2f}", taken apart', icon: 'code', tone: 'ingest', children: [
        { type: 'item', id: 'value', title: '4460.9', sub: 'the value', icon: 'code' },
        { type: 'table', id: 'parts', title: ':>12,.2f', tone: 'ingest', columns: ['part', 'means'], rows: [['>', 'align right'], ['12', 'at least 12 wide'], [',', 'thousands separator'], ['.2', '2 decimal places'], ['f', 'fixed point']] },
      ],
    },
    { type: 'table', id: 'asked', title: 'Asked in the REPL', tone: 'store', columns: ['typed', 'answer (· is a space)'], rows: [['f"[{amount:>12,.2f}]"', "'[····4,460.90]'"], ['f"[{\'KEN\':<6}]"', "'[KEN···]'"]] },
    { type: 'table', id: 'out', title: 'The report it lines up', tone: 'store', columns: ['product', 'revenue', 'bags'], rows: [['KEN-1000', '4,460.90', '160'], ['COL-500', '3,196.39', '203'], ['total', '11,578.88', '']] },
    { type: 'note', id: 'f-note', tone: 'ingest', text: 'The same spec on every row is what makes the columns line up: text left, numbers right.' },
  ],
  edges: [{ from: 'value', to: 'parts', label: 'format' }],
})
