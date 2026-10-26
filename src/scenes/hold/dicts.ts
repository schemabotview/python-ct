import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/hold/07-dicts/project/main.py?raw'
import session from '../../../spine/hold/07-dicts/session.txt?raw'

// §7 — dictionaries: the catalogue keyed by SKU, an order line as a record; the lookup and the
// KeyError are the session's.
export const holdDicts: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [7, 8, 9, 10, 11, 21, 22] },
  session,
  side: [
    {
      type: 'group', id: 'lookup', title: 'CATALOGUE[first["sku"]]', icon: 'search', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'first', title: 'first: a dict', rows: [['id', "'ORD-1001'"], ['customer', "'maya'"], ['sku', "'ETH-250'"], ['quantity', '3']] },
        { type: 'table', id: 'cat', title: 'CATALOGUE: a dict', rows: [{ id: 'eth', cells: ["'ETH-250'", "Decimal('9.95')"] }, { id: 'col', cells: ["'COL-500'", "Decimal('17.50')"] }, { id: 'ken', cells: ["'KEN-1000'", "Decimal('31.00')"] }] },
      ],
    },
    {
      type: 'table', id: 'asked', title: 'Asked in the REPL', tone: 'ingest', columns: ['typed', 'Python answers'], rows: [
        { cells: ['CATALOGUE["COL-500"]', "Decimal('17.50')"], tone: 'store' },
        { cells: ['CATALOGUE["BRA-500"]', "KeyError: 'BRA-500'"], tone: 'consume' },
      ],
    },
    {
      type: 'table', id: 'how', title: 'How a dict finds a key', tone: 'ingest', columns: ['', ''], rows: [
        ['hash(key)', 'a number made from the key'],
        ['that number', 'says where to look'],
        ['so a lookup', 'is one step, at any size'],
      ],
    },
    {
      type: 'table', id: 'orders', title: 'ORDERS: a list of four dicts', tone: 'ingest', columns: ['id', 'customer', 'sku', 'quantity'], rows: [
        ['ORD-1001', 'maya', 'ETH-250', 3], ['ORD-1002', 'omar', 'COL-500', 12], ['ORD-1003', 'lena', 'KEN-1000', 2], ['ORD-1004', 'maya', 'ETH-250', 1],
      ],
    },
    { type: 'item', id: 'dc-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a key finds its value in one step', 'a missing key raises KeyError'] },
  ],
  edges: [{ from: 'first.sku', to: 'cat.eth', label: 'looked up' }],
})
