import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/transform/01-grouping/project/main.py?raw'
import session from '../../../spine/transform/01-grouping/session.txt?raw'

// §1 — grouping with a dict: revenue per product over October. The amounts are the session's.
export const transformGrouping: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days' }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'sku = line["sku"]', 'revenue[sku] = revenue.get'), show: [[lineOf(code, 'paths = sorted'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'buckets', title: 'Each priced line drops into its product', icon: 'boxes', tone: 'ingest', dir: 'row', children: [
        { type: 'item', id: 'line', title: 'a priced line', sub: 'sku, total', icon: 'file' },
        { type: 'table', id: 'revenue', title: 'revenue: a dict', tone: 'store', columns: ['sku', 'October'], rows: [['BRA-500', '1500.69'], ['COL-500', '3196.39'], ['ETH-250', '2420.90'], ['KEN-1000', '4460.90']] },
      ],
    },
    {
      type: 'table', id: 'get', title: 'revenue.get(sku, Decimal("0"))', tone: 'ingest', columns: ['the first time', 'after that'], rows: [['no key yet: 0', 'the running total'], ['+ this line', '+ this line']],
    },
    { type: 'table', id: 'asked', title: 'Asked in the REPL', tone: 'store', columns: ['typed', 'answer'], rows: [['revenue.get("GUA-250", Decimal("0"))', "Decimal('0')"]] },
    { type: 'item', id: 'gr-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a dict keyed by the group', 'one pass, one running total per key'] },
    {
      type: 'table', id: 'trace', title: 'The first four lines of October', tone: 'ingest', columns: ['line', 'adds', 'to', 'now'], rows: [
        ['ORD-1001', '29.85', 'ETH-250', '29.85'], ['ORD-1002', '178.50', 'COL-500', '178.50'], ['ORD-1003', '58.90', 'KEN-1000', '58.90'], { cells: ['ORD-1004', '9.95', 'ETH-250', '39.80'], tone: 'store' },
      ],
    },
  ],
  edges: [{ from: 'line', to: 'revenue', label: 'by sku' }],
})
