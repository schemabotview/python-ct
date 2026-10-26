import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/load/05-safe-reruns/project/main.py?raw'
import session from '../../../spine/load/05-safe-reruns/session.txt?raw'

// §5 — safe re-runs: write_atomic (a temp file, then one rename) and an UPSERT. Both runs printing the
// same totals, and data/out, are the session's.
export const loadSafeReruns: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days', out: ['daily_report.csv', 'summary.json', 'warehouse.db'], fresh: [] }),
  editor: { file: 'main.py', code, highlight: [...linesFrom(code, 'def write_atomic', 'temp.replace(path)'), lineOf(code, 'UPSERT = ')], show: [[lineOf(code, 'def write_atomic'), lineOf(code, 'temp.replace(path)')], [lineOf(code, 'UPSERT = '), lineOf(code, 'quantity = excluded')], [lineOf(code, 'with sqlite3.connect'), lineOf(code, 'return result')], [lineOf(code, 'count, cents'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'atomic', title: 'write_atomic: a whole file, or the old one', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'temp', title: 'summary.json.tmp', sub: 'write the new text here', icon: 'file' },
        { type: 'item', id: 'swap', title: 'temp.replace(path)', sub: 'one rename: no half file', icon: 'lock' },
        { type: 'item', id: 'done', title: 'summary.json', sub: 'old or new, never half', icon: 'check', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'upsert', title: 'The second run, per row', tone: 'ingest', columns: ['statement', 'an id already there'], rows: [
        { cells: ['INSERT', 'IntegrityError'], tone: 'consume' }, ['INSERT … ON CONFLICT DO UPDATE', 'update it in place'], ['excluded.total_cents', 'the value we tried to insert'],
      ],
    },
{
      type: 'table', id: 'crash', title: 'If the job dies…', tone: 'ingest', columns: ['…while', 'summary.json is'], rows: [
        { cells: ['writing summary.json.tmp', 'the old file, intact'], tone: 'consume' }, ['after the replace', 'the new file, whole'], ['run again', 'rewritten: same bytes'],
      ],
    },
        { type: 'item', id: 'sr-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['files: write a temp file, then replace', 'rows: upsert on the primary key'] },
    { type: 'note', id: 'sr-note', tone: 'ingest', text: 'A crash before the rename leaves the old file intact; a re-run fixes it. Safe to run twice means safe to retry.' },
  ],
  edges: [{ from: 'temp', to: 'swap' }, { from: 'swap', to: 'done' }],
})
