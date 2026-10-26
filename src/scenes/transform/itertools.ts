import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/transform/06-itertools/project/main.py?raw'
import session from '../../../spine/transform/06-itertools/session.txt?raw'

// §6 — itertools: groupby over a generator of priced lines, islice for a preview, chain in the REPL.
// The three days and 31 days are the session's.
export const transformItertools: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days' }),
  editor: { file: 'main.py', code, highlight: [...linesFrom(code, 'def priced_lines', 'yield {'), ...linesFrom(code, 'for day, group in groupby', 'daily[dt.date')], show: [[lineOf(code, 'def priced_lines'), lineOf(code, 'yield {')], [lineOf(code, 'paths = sorted'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'lazy', title: 'A lazy chain: one line pulled through at a time', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'rows', title: 'iter_rows(paths)', sub: 'CSV rows, file by file', icon: 'file' },
        { type: 'item', id: 'priced', title: 'priced_lines(rows, rejected)', sub: 'valid lines, with a total', icon: 'check' },
        { type: 'item', id: 'grouped', title: 'groupby(lines, key=itemgetter("date"))', sub: 'one group per day, in order', icon: 'layers' },
        { type: 'item', id: 'daily', title: 'daily: 31 days', sub: 'the only thing kept', icon: 'table', tone: 'store' },
      ],
    },
    { type: 'table', id: 'preview', title: 'islice(daily.items(), 3)', tone: 'store', rows: [['2026-10-01', '309.70'], ['2026-10-02', '37.40'], ['2026-10-03', '261.40']] },
    { type: 'table', id: 'chain', title: 'chain, in the REPL', tone: 'ingest', rows: [['>>> list(chain(["ETH-250"], ["COL-500", "KEN-1000"]))'], ["['ETH-250', 'COL-500', 'KEN-1000']"]] },
    { type: 'note', id: 'it-note', tone: 'ingest', text: 'groupby only joins neighbours: it needs the lines already in date order, which sorted file names give us.' },
  ],
  edges: [{ from: 'rows', to: 'priced' }, { from: 'priced', to: 'grouped' }, { from: 'grouped', to: 'daily' }],
})
