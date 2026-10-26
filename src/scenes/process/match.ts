import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/03-match/project/main.py?raw'
import session from '../../../spine/process/03-match/session.txt?raw'

// §3 — match: ORD-1005's quantity is the text 'three', so the first pattern fails and the second
// binds it (main.py prints: cannot price: ORD-1005 quantity 'three').
export const processMatch: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'row = ORDERS[4]', 'print("cannot price'), show: [[1, 4], [lineOf(code, 'ORD-1005'), lineOf(code, 'ORD-1005')], [lineOf(code, 'row = ORDERS[4]'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'tried', title: 'match row — ORD-1005', icon: 'search', tone: 'ingest', children: [
        { type: 'item', id: 'the-row', title: 'quantity: \'three\'', sub: 'a str, not an int', icon: 'file' },
        { type: 'item', id: 'case1', title: 'case {"sku": sku, "quantity": int(qty)} if qty > 0', sub: 'no match: \'three\' is not an int', icon: 'bell', tone: 'consume' },
        { type: 'item', id: 'case2', title: 'case {"quantity": qty}', sub: 'matches: qty = \'three\'', icon: 'check', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'parts', title: 'Reading a pattern', tone: 'ingest', columns: ['pattern', 'means'], rows: [
        ['{"sku": sku, ...}', 'a dict with these keys'], ['int(qty)', 'an int, bound to qty'], ['if qty > 0', 'a guard: an extra condition'], ['case _:', 'anything else'],
      ],
    },
    { type: 'item', id: 'm-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['cases are tried top to bottom', 'the first match wins'] },
    { type: 'table', id: 'printed', title: 'main.py prints', tone: 'store', rows: [["cannot price: ORD-1005 quantity 'three'"]] },
  ],
  edges: [{ from: 'the-row', to: 'case1' }, { from: 'case1', to: 'case2', label: 'next case' }],
})
