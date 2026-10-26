import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, lastLine } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/04-for/project/main.py?raw'
import session from '../../../spine/process/04-for/session.txt?raw'

// §4 — for: every line of the day, priced. The output rows and 277.20 are the session's.
export const processFor: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [lineOf(code, 'for line in ORDERS'), lineOf(code, 'day_total += total')], show: [[1, 4], [lineOf(code, 'day_total = Decimal'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'cursor', title: 'for line in ORDERS — the second pass', icon: 'memory', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'loopname', title: 'names', rows: [['line', '●'], ['day_total', '29.85']] },
        { type: 'table', id: 'orders', title: 'ORDERS', rows: [{ id: 'o1', cells: ['ORD-1001'] }, { id: 'o2', cells: ['ORD-1002'], tone: 'store' }, { id: 'o3', cells: ['ORD-1003'] }, { id: 'o4', cells: ['ORD-1004'] }, { id: 'o5', cells: ['ORD-1005'] }] },
      ],
    },
    {
      type: 'table', id: 'out', title: 'What the loop printed', tone: 'ingest', columns: ['line', 'sku', 'bags', 'total'], rows: [
        ['ORD-1001', 'ETH-250', 3, '29.85'], ['ORD-1002', 'COL-500', 12, '178.50'], ['ORD-1003', 'KEN-1000', 2, '58.90'], ['ORD-1004', 'ETH-250', 1, '9.95'],
        { cells: ['ORD-1005', 'skipped', "'three'", ''], tone: 'consume' }, { cells: ['day total', '', '', '277.20'], tone: 'store' },
      ],
    },
    { type: 'item', id: 'f-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['the name is rebound on every pass', 'the body runs once per item'] },
    {
      type: 'table', id: 'anatomy', title: 'The parts of a loop', tone: 'ingest', columns: ['', ''], rows: [
        ['for line in ORDERS:', 'the header: one pass per line'], ['the indented block', 'the body, run on every pass'], ['the next unindented line', 'runs once, after the loop'],
      ],
    },
  ],
  edges: [{ from: 'loopname.line', to: 'orders.o2' }],
})
