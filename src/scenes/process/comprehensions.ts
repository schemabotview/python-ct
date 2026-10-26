import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/06-comprehensions/project/main.py?raw'
import session from '../../../spine/process/06-comprehensions/session.txt?raw'

// §6 — comprehensions, and 3.15's unpacking inside them (DAYS flattened to one list). The totals
// and customers are the session's.
export const processComprehensions: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [lineOf(code, 'lines = [*day'), ...linesFrom(code, 'bags = sum', 'customers = sorted')], show: [[1, 4], [lineOf(code, 'DAYS = {'), lineOf(code, 'priced, skipped')], [lineOf(code, 'bags = sum'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'flatten', title: '[*day for day in DAYS.values()] — new in 3.15', icon: 'workflow', tone: 'serve', dir: 'row', children: [
        { type: 'group', id: 'days', bare: true, children: [
          { type: 'table', id: 'd1', title: '2026-10-01', rows: [['ORD-1001'], ['ORD-1002'], ['ORD-1003'], ['ORD-1004'], ['ORD-1005']] },
          { type: 'table', id: 'd2', title: '2026-10-02', rows: [['ORD-1007']] },
        ] },
        { type: 'table', id: 'flat', title: 'lines: one list', rows: [['ORD-1001'], ['ORD-1002'], ['ORD-1003'], ['ORD-1004'], ['ORD-1005'], ['ORD-1007']], tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'mapping', title: 'A comprehension is a loop, written backwards', tone: 'ingest', columns: ['comprehension', 'loop'], rows: [
        ['line["quantity"]', 'what to keep'], ['for line, total in priced', 'for line, total in priced:'], ['{ … }', 'into a set: duplicates dropped'],
      ],
    },
    { type: 'table', id: 'printed', title: 'main.py prints, after the lines', tone: 'store', rows: [['total: 294.70 | bags: 19 | skipped: 1'], ["customers: ['lena', 'maya', 'omar']"]] },
    { type: 'item', id: 'c-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['one comprehension, one idea', 'a loop when it needs several steps'] },
    { type: 'note', id: 'chain', tone: 'ingest', text: 'Unpacking with * inside a comprehension needs 3.15; on older versions, itertools.chain does the same job.' },
  ],
  edges: [{ from: 'd1', to: 'flat' }, { from: 'd2', to: 'flat' }],
})
