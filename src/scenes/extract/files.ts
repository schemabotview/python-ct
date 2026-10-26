import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { dataTree } from './tree'
import code from '../../../spine/extract/01-files/project/main.py?raw'
import session from '../../../spine/extract/01-files/session.txt?raw'

// §1 — files and with: the first day is read from data/raw; file.closed is True after the with
// block (the session).
export const extractFiles: SceneModel = ideFrame({
  tree: dataTree(['orders-2026-10-01.csv'], { fresh: ['orders-2026-10-01.csv'] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'with open(', 'ORDERS = [dict'), show: [[lineOf(code, 'with open('), lineOf(code, '"2026-10-02": [')], [lineOf(code, 'lines = [*day'), lineOf(code, 'print(line["id"]')]] },
  session,
  side: [
    {
      type: 'group', id: 'life', title: 'with open(...) as file:', icon: 'file', tone: 'ingest', children: [
        { type: 'item', id: 'open', title: 'open the file', sub: 'a file object, bound to file', icon: 'file' },
        { type: 'item', id: 'read', title: 'read it', sub: 'readline() for the header, then for line in file', icon: 'search' },
        { type: 'item', id: 'close', title: 'leave the block: closed', sub: 'even if an error happens inside', icon: 'check', tone: 'store' },
      ],
    },
    {
      type: 'group', id: 'zip', title: 'dict(zip(header, values))', icon: 'workflow', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'hdr', title: 'header', rows: [['id'], ['date'], ['customer'], ['sku'], ['quantity']] },
        { type: 'table', id: 'vals', title: 'line 2, split', rows: [["'ORD-1001'"], ["'2026-10-01'"], ["'maya'"], ["'ETH-250'"], ["'3'"]] },
      ],
    },
    { type: 'table', id: 'asked', title: 'After the script, in the REPL', tone: 'store', columns: ['typed', 'answer'], rows: [['file.closed', 'True']] },
    { type: 'item', id: 'fi-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['every value from a file is text', 'with closes the file for certain'] },
  ],
  edges: [{ from: 'open', to: 'read' }, { from: 'read', to: 'close' }, { from: 'hdr', to: 'vals', label: 'paired' }],
})
