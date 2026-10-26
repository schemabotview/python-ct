import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/08-arguments/project/main.py?raw'
import session from '../../../spine/process/08-arguments/session.txt?raw'

// §8 — arguments, and the mutable-default trap: both calls append to the ONE list made when the
// def ran (the session's ['bad quantity', 'unknown product']).
export const processArguments: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [lineOf(code, 'def price_line'), lineOf(code, 'subtotal = catalogue')], show: [[1, 4], [lineOf(code, 'def price_line'), lineOf(code, 'return (subtotal')]] },
  session,
  side: [
    {
      type: 'group', id: 'trap', title: 'def add_reason(reason, reasons=[]) — one list for every call', icon: 'memory', tone: 'consume', dir: 'row', children: [
        { type: 'group', id: 'holders', bare: true, children: [
          { type: 'table', id: 'fn', title: 'function add_reason', rows: [['default', '●']] },
          { type: 'table', id: 'call2', title: 'second call', rows: [['reasons', '●']] },
        ] },
        { type: 'table', id: 'shared', title: 'list: made once, when def ran', tone: 'consume', rows: [["['bad quantity', 'unknown product']"]] },
      ],
    },
    {
      type: 'table', id: 'kinds', title: 'Ways to pass an argument', tone: 'ingest', columns: ['call', 'kind'], rows: [
        ['price_line("COL-500", 12)', 'by position'], ['price_line(sku="COL-500", quantity=12)', 'by keyword'], ['catalogue=CATALOGUE', 'a default, when left out'],
      ],
    },
    { type: 'table', id: 'fix', title: 'The fix: default to None', tone: 'store', rows: [['def add_reason(reason, reasons=None):'], ['    if reasons is None: reasons = []']] },
    { type: 'item', id: 'a-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['defaults are made once, at def', 'never a mutable default'] },
    {
      type: 'table', id: 'calls', title: 'The REPL, call by call', tone: 'consume', columns: ['call', 'returns'], rows: [
        ['add_reason("bad quantity")', "['bad quantity']"], ['add_reason("unknown product")', "['bad quantity', 'unknown product']"],
      ],
    },
    { type: 'note', id: 'safe', tone: 'ingest', text: 'Our catalogue default is safe: a frozendict can never change, so every call sees the same prices.' },
  ],
  edges: [{ from: 'fn.default', to: 'shared' }, { from: 'call2.reasons', to: 'shared' }],
})
