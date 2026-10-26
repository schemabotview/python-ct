import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/07-functions/project/main.py?raw'
import session from '../../../spine/process/07-functions/session.txt?raw'

// §7 — functions: the stack while discount_rate runs for ORD-1002; price_line("COL-500", 12) is
// Decimal('178.50') in the session.
export const processFunctions: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def price_line', 'return (subtotal'), show: [[lineOf(code, 'def discount_rate'), lineOf(code, 'return (subtotal')], [lineOf(code, 'total = price_line'), lineOf(code, 'total = price_line')]] },
  session,
  side: [
    {
      type: 'group', id: 'stack', title: 'The call stack inside discount_rate', sub: 'newest on top', icon: 'layers', tone: 'ingest', children: [
        { type: 'table', id: 'f-rate', title: 'discount_rate', tone: 'store', rows: [['quantity', 12], ['subtotal', '210.00']] },
        { type: 'table', id: 'f-price', title: 'price_line', rows: [['sku', "'COL-500'"], ['quantity', 12], ['subtotal', '210.00']] },
        { type: 'table', id: 'f-module', title: '<module>', rows: [['line', 'ORD-1002'], ['priced', '1 line so far']] },
      ],
    },
    { type: 'table', id: 'typed', title: 'Called on its own, in the REPL', tone: 'store', columns: ['typed', 'answer'], rows: [['price_line("COL-500", 12)', "Decimal('178.50')"]] },
    { type: 'item', id: 'fn-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a function names a step', 'test it on its own, by calling it'] },
    { type: 'note', id: 'doc', tone: 'ingest', text: 'The docstring under def is for people: help(price_line) prints it.' },
  ],
  edges: [{ from: 'f-rate', to: 'f-price', label: 'returns 0.15' }, { from: 'f-price', to: 'f-module', label: 'returns 178.50' }],
})
