import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { PROJECT, files } from './lab'
import code from '../../../spine/picture/09-stack/project/orders.py?raw'
import session from '../../../spine/picture/09-stack/session.txt?raw'

// §9 — frames and the call stack, at line 8 (inside line_total's loop over inspect.stack()). The
// three frames and their line numbers are the session's; the locals are the program's state then.
export const callStack: SceneModel = ideFrame({
  project: PROJECT,
  tree: files(['orders.py'], 'orders.py'),
  editor: { file: 'orders.py', code, highlight: [7, 8, 15, 19] },
  session,
  side: [
    {
      type: 'group', id: 'frames', title: 'The call stack at line 8', sub: 'newest on top', icon: 'layers', tone: 'ingest', dir: 'row', children: [
        {
          type: 'group', id: 'stack', bare: true, children: [
            { type: 'table', id: 'f-line', title: 'line_total — line 7', tone: 'store', rows: [['sku', "'ETH-250'"], ['qty', 2]] },
            { type: 'table', id: 'f-order', title: 'order_total — line 15', rows: [['order', '●'], ['total', 0], ['sku', "'ETH-250'"], ['qty', 2]] },
            { type: 'table', id: 'f-module', title: '<module> — line 19', rows: [['PRICES', '●'], ['line_total', 'function'], ['order_total', 'function']] },
          ],
        },
        {
          type: 'group', id: 'heap', bare: true, children: [
            { type: 'table', id: 'h-order', title: 'dict', rows: [["'ETH-250'", 2]] },
            { type: 'table', id: 'h-prices', title: 'dict', rows: [["'ETH-250'", 9.95], ["'COL-500'", 17.5]] },
          ],
        },
      ],
    },
    {
      type: 'table', id: 'calls', title: 'What a call does', tone: 'ingest', columns: ['', ''], rows: [
        ['a call', 'pushes a new frame: its own locals'],
        ['a return', 'pops it; the caller carries on'],
        ['an error', 'unwinds frames until one handles it'],
        ['a traceback', 'prints these frames, oldest first'],
      ],
    },
    { type: 'note', id: 'locals', tone: 'ingest', text: "Each frame's names are its own: line_total's sku and order_total's sku are two names, in two frames." },
  ],
  edges: [{ from: 'f-order.order', to: 'h-order' }, { from: 'f-module.PRICES', to: 'h-prices' }],
})
