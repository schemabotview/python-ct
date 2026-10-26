import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { dataTree, DAYS_1_3 } from './tree'
import code from '../../../spine/extract/06-validating/project/main.py?raw'
import session from '../../../spine/extract/06-validating/session.txt?raw'

// §6 — validating rows: parse_row keeps the good and names the bad. The four reasons are the
// session's; day 3 gained three bad rows from the shop.
export const extractValidating: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { fresh: ['orders-2026-10-03.csv'] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def parse_row', 'return {**row'), show: [[lineOf(code, 'MISSING = sentinel'), lineOf(code, 'MISSING = sentinel')], [lineOf(code, 'def parse_row'), lineOf(code, 'return {**row')]] },
  session,
  side: [
    {
      type: 'table', id: 'day3', title: 'Day 3, row by row', tone: 'ingest', columns: ['row', 'parse_row says'], rows: [
        ['ORD-1009 … ORD-1012', 'a clean line: quantity now an int'],
        { cells: ['ORD-1013', 'no customer'], tone: 'consume' },
        { cells: ['ORD-1014', "quantity '-1'"], tone: 'consume' },
        { cells: ['ORD-1015', 'no quantity: the row is short'], tone: 'consume' },
      ],
    },
    {
      type: 'group', id: 'gate', title: 'Every row passes one gate', icon: 'shield', tone: 'ingest', children: [
        { type: 'item', id: 'row', title: 'a CSV row', sub: 'all text, maybe incomplete', icon: 'file' },
        { type: 'group', id: 'outs', bare: true, dir: 'row', children: [
          { type: 'item', id: 'clean', title: 'a clean line', sub: 'priced', icon: 'check', tone: 'store' },
          { type: 'item', id: 'bad', title: 'InvalidOrder', sub: 'reported, with why', icon: 'bell', tone: 'consume' },
        ] },
      ],
    },
    { type: 'table', id: 'missing', title: 'row.get(field, MISSING)', tone: 'serve', columns: ['gets', 'means'], rows: [['MISSING', 'the file has no such column'], ['None or ""', 'the row left it empty']] },
    { type: 'table', id: 'printed', title: 'The run reports', tone: 'consume', rows: [["rejected ORD-1005: quantity 'three'"], ['rejected ORD-1013: no customer'], ["rejected ORD-1014: quantity '-1'"], ['rejected ORD-1015: no quantity']] },
    { type: 'item', id: 'va-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['check once, at the door', 'then price only clean lines'] },
  ],
  edges: [{ from: 'row', to: 'clean' }, { from: 'row', to: 'bad' }],
})
