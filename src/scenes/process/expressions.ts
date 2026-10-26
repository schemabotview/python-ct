import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/01-expressions/project/main.py?raw'
import session from '../../../spine/process/01-expressions/session.txt?raw'

// §1 — expressions and operators: precedence in the REPL (14, 20, (3, 1, 8)) and a line total.
export const processExpressions: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'subtotal =', 'total ='), show: [[1, 6], [lineOf(code, 'ORDERS = ['), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'tree', title: 'subtotal - subtotal * Decimal("0.15")', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'minus', title: '−', sub: 'evaluated last', icon: 'zap' },
        { type: 'group', id: 'row1', bare: true, dir: 'row', children: [
          { type: 'item', id: 'sub-a', title: 'subtotal', sub: '210.00', icon: 'file' },
          { type: 'item', id: 'times', title: '×', sub: 'evaluated first: 31.5000', icon: 'zap' },
        ] },
        { type: 'group', id: 'row2', bare: true, dir: 'row', children: [
          { type: 'item', id: 'sub-b', title: 'subtotal', sub: '210.00', icon: 'file' },
          { type: 'item', id: 'rate', title: 'Decimal("0.15")', sub: '15%', icon: 'file' },
        ] },
      ],
    },
    {
      type: 'table', id: 'typed', title: 'Typed at >>>', tone: 'ingest', columns: ['typed', 'answer', 'because'], rows: [
        ['2 + 3 * 4', '14', '* before +'], ['(2 + 3) * 4', '20', 'brackets first'], ['7 // 2, 7 % 2, 2 ** 3', '(3, 1, 8)', 'floor, remainder, power'],
      ],
    },
    { type: 'table', id: 'printed', title: 'main.py prints', tone: 'store', rows: [['line: ORD-1002 210.00 178.50']] },
    { type: 'item', id: 'e-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['multiplication binds tighter than minus', 'brackets when a reader might doubt'] },
    {
      type: 'table', id: 'ops', title: 'The arithmetic operators', tone: 'ingest', columns: ['operator', 'means'], rows: [
        ['+  -', 'add, subtract'], ['*  /', 'multiply, divide (/ always gives a fraction)'], ['//  %', 'whole times, and what is left over'], ['**', 'to the power of'],
      ],
    },
  ],
  edges: [{ from: 'minus', to: 'sub-a' }, { from: 'minus', to: 'times' }, { from: 'times', to: 'sub-b' }, { from: 'times', to: 'rate' }],
})
