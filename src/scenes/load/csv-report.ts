import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/load/01-csv-report/project/main.py?raw'
import session from '../../../spine/load/01-csv-report/session.txt?raw'

// §1 — csv.writer into data/out: the daily totals become a report a person can open. The rows are
// the session's `head -4`.
export const loadCsvReport: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days', out: ['daily_report.csv'], fresh: ['daily_report.csv'] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def write_report', 'writer.writerow([date.isoformat()'), show: [[lineOf(code, 'def write_report'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'summary["daily"] → daily_report.csv', icon: 'workflow', tone: 'ingest', children: [
        { type: 'table', id: 'daily', title: 'daily: a dict', columns: ['key: date', 'value: Decimal'], rows: [['2026-10-01', '309.70'], ['2026-10-02', '37.40'], ['2026-10-03', '261.40']] },
        { type: 'table', id: 'file', title: 'data/out/daily_report.csv', tone: 'store', rows: [['date,revenue'], ['2026-10-01,309.70'], ['2026-10-02,37.40'], ['2026-10-03,261.40']] },
      ],
    },
    {
      type: 'table', id: 'parts', title: 'The pieces of write_report', tone: 'ingest', columns: ['code', 'why'], rows: [
        ['path.parent.mkdir(…, exist_ok=True)', 'data/out may not exist yet'], ['open("w", newline="")', 'csv chooses the line endings'],
        ['csv.writer(file)', 'quotes a comma inside a value'], ['writerow([date.isoformat(), amount])', 'one list = one row'],
      ],
    },
    { type: 'item', id: 'cr-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a writer turns lists into rows', 'one header row, then one row per day'] },
  ],
  edges: [{ from: 'daily', to: 'file', label: 'writerow' }],
})
