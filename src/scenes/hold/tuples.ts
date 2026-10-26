import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/hold/06-tuples/project/main.py?raw'
import session from '../../../spine/hold/06-tuples/session.txt?raw'

// §6 — tuples and unpacking: one tuple's three slots bound to three names (line 15); the TypeError
// is the session's.
export const holdTuples: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [7, 8, 9, 10, 11, 15] },
  session,
  side: [
    {
      type: 'group', id: 'unpack', title: 'order_id, sku, quantity = lines[0]', icon: 'memory', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 't-tuple', title: 'tuple', rows: [{ id: 'r0', cells: ['0', "'ORD-1001'"] }, { id: 'r1', cells: ['1', "'ETH-250'"] }, { id: 'r2', cells: ['2', '3'] }] },
        { type: 'table', id: 't-names', title: 'names', rows: [['order_id'], ['sku'], ['quantity']] },
      ],
    },
    { type: 'table', id: 'all-lines', title: 'lines: a list of four tuples', tone: 'ingest', rows: [["('ORD-1001', 'ETH-250', 3)"], ["('ORD-1002', 'COL-500', 12)"], ["('ORD-1003', 'KEN-1000', 2)"], ["('ORD-1004', 'ETH-250', 1)"]] },
    {
      type: 'table', id: 'compare', title: 'A list and a tuple', tone: 'ingest', columns: ['', 'list [ ]', 'tuple ( )'], rows: [
        ['change it', 'yes', 'no: TypeError'],
        ['holds', 'many of one kind', 'one record'],
        ['here', 'the day’s lines', 'one line'],
      ],
    },
    { type: 'table', id: 'refused', title: 'lines[0][2] = 4', tone: 'consume', rows: [["TypeError: 'tuple' object does not support item assignment"]] },
    { type: 'note', id: 't-note', tone: 'ingest', text: 'Unpacking binds one name per slot, left to right. The number of names must match the number of slots.' },
    { type: 'item', id: 't-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a tuple is a fixed record', 'unpacking: one name per slot'] },
  ],
  edges: [{ from: 't-tuple.r0', to: 't-names.order_id' }, { from: 't-tuple.r1', to: 't-names.sku' }, { from: 't-tuple.r2', to: 't-names.quantity' }],
})
