import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/load/03-json/project/main.py?raw'
import session from '../../../spine/load/03-json/session.txt?raw'

// §3 — the summary as JSON, money as strings. The file's head is the session's; json.dumps refusing a
// Decimal was run on 3.15.1 (TypeError: Object of type Decimal is not JSON serializable).
export const loadJson: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days', out: ['daily_report.csv', 'summary.json'], fresh: ['summary.json'] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def write_summary', 'path.write_text(json.dumps'), show: [[lineOf(code, 'def write_summary'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'map', title: 'Python → JSON', icon: 'workflow', tone: 'ingest', children: [
        { type: 'table', id: 'py', title: 'Python', rows: [['dict'], ['str'], ['int'], ['list, tuple'], ['None, True'], { cells: ['Decimal'], tone: 'consume' }] },
        { type: 'table', id: 'js', title: 'JSON', tone: 'store', rows: [['object'], ['string'], ['number'], ['array'], ['null, true'], { cells: ['TypeError: we choose str'], tone: 'consume' }] },
      ],
    },
    { type: 'table', id: 'file', title: 'data/out/summary.json', tone: 'store', rows: [['{'], ['  "month": "2026-10",'], ['  "total": "11578.88",'], ['  "rejected": 13,']] },
    { type: 'note', id: 'j-note', tone: 'ingest', text: 'A JSON number is usually read back as a float. A string keeps 11578.88 exact; the reader turns it back into Decimal.' },
  ],
  edges: [{ from: 'py', to: 'js', label: 'json.dumps' }],
})
