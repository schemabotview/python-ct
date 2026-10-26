import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from './tree'
import code from '../../../spine/extract/07-generators/project/main.py?raw'
import session from '../../../spine/extract/07-generators/session.txt?raw'

// §7 — generators: the month streamed one row at a time. 31 files, 163 priced, 13 rejected and the
// total are the session's; so are the two next() calls.
export const extractGenerators: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { fresh: [], more: '… 28 more days, new' }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def iter_rows', 'yield from'), show: [[lineOf(code, 'def iter_rows'), lineOf(code, 'yield from')], [lineOf(code, 'paths = sorted'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'pause', title: 'next(rows): run to the next yield, then pause', icon: 'layers', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'caller', title: 'the caller', rows: [['rows', '●'], ['asks', 'next(rows)']] },
        { type: 'table', id: 'gen', title: 'iter_rows — paused', tone: 'store', rows: [['path', 'orders-2026-10-01.csv'], ['at', 'yield from …'], ['gave', 'ORD-1001, ORD-1002']] },
      ],
    },
    { type: 'table', id: 'asked', title: 'Asked in the REPL', tone: 'store', columns: ['typed', 'answer'], rows: [['next(rows)["id"], next(rows)["id"]', "('ORD-1001', 'ORD-1002')"]] },
    {
      type: 'table', id: 'month', title: 'October, streamed', tone: 'ingest', columns: ['', ''], rows: [
        ['files', '31'], ['priced', '163 lines'], ['rejected', '13 lines'], { cells: ['October total', '11578.88'], tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'cost', title: 'A list or a generator?', tone: 'ingest', columns: ['', 'holds in memory'], rows: [
        ['a list of the month', 'every row, before the first is used'], ['iter_rows', 'one file, handing out one row at a time'],
      ],
    },
    { type: 'item', id: 'gn-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['yield pauses the function', 'each next() resumes it where it stopped'] },
    { type: 'note', id: 'g-note', tone: 'ingest', text: 'Nothing runs when iter_rows is called; the body runs a little at a time, each time the loop asks for a row.' },
  ],
  edges: [{ from: 'caller', to: 'gen', label: 'next()' }],
})
