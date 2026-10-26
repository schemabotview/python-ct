import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/02-decisions/project/main.py?raw'
import session from '../../../spine/process/02-decisions/session.txt?raw'

// §2 — decisions: the discount rules, the path for ORD-1002 (12 bags) lit. The four rates are the
// rules applied to the day (their totals are printed in §4).
export const processDecisions: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'if quantity >= 10', 'rate = Decimal("0")'), show: [[1, 6], [lineOf(code, 'print("roastery'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'chart', title: 'Which discount?', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'q1', title: 'quantity >= 10?', sub: '12 bags: yes', icon: 'search', tone: 'store' },
        { type: 'group', id: 'branches', bare: true, dir: 'row', children: [
          { type: 'item', id: 'r15', title: 'yes: 15% off', sub: 'wholesale — ORD-1002', icon: 'check', tone: 'store' },
          { type: 'group', id: 'no1', bare: true, children: [
            { type: 'item', id: 'q2', title: 'no: subtotal >= 50?', icon: 'search' },
            { type: 'group', id: 'leaves', bare: true, dir: 'row', children: [
              { type: 'item', id: 'r5', title: 'yes: 5% off', sub: 'ORD-1003', icon: 'check' },
              { type: 'item', id: 'r0', title: 'no: full price', sub: 'ORD-1001, 1004', icon: 'check' },
            ] },
          ] },
        ] },
      ],
    },
    {
      type: 'table', id: 'applied', title: 'The rules, on the first day', tone: 'ingest', columns: ['line', 'bags', 'subtotal', 'rate'], rows: [
        ['ORD-1001', 3, '29.85', '0'], { cells: ['ORD-1002', 12, '210.00', '0.15'], tone: 'store' }, ['ORD-1003', 2, '62.00', '0.05'], ['ORD-1004', 1, '9.95', '0'],
      ],
    },
    { type: 'table', id: 'cond', title: 'A conditional expression, in the REPL', tone: 'ingest', columns: ['typed', 'answer'], rows: [['"wholesale" if quantity >= 10 else "retail"', "'wholesale'"]] },
    { type: 'item', id: 'd-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['the first true branch wins', 'so the order of the rules is a rule'] },
    { type: 'note', id: 'indent', tone: 'ingest', text: 'Python reads the indentation: the lines indented under a branch are that branch, and nothing marks the end but the dedent.' },
  ],
  edges: [
    { from: 'q1', to: 'r15' }, { from: 'q1', to: 'no1' },
    { from: 'q2', to: 'r5' }, { from: 'q2', to: 'r0' },
  ],
})
