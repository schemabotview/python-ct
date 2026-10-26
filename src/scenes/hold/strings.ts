import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/hold/03-strings/project/main.py?raw'
import session from '../../../spine/hold/03-strings/session.txt?raw'

// §3 — strings: indexing and slicing the SKU. sku[-3:] and split are the session's; main.py prints
// "product: ETH 250 g".
export const holdStrings: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [12, 13, 14] },
  session,
  side: [
    {
      type: 'table', id: 'cells', title: 'sku = "ETH-250": seven characters', tone: 'ingest', columns: ['', '', '', '', '', '', '', ''], rows: [
        ['index', '0', '1', '2', '3', '4', '5', '6'],
        { cells: ['char', 'E', 'T', 'H', '-', '2', '5', '0'], tone: 'store' },
        ['from end', '-7', '-6', '-5', '-4', '-3', '-2', '-1'],
      ],
    },
    {
      type: 'table', id: 'slices', title: 'Slices: from the start, up to but not including the end', tone: 'ingest', columns: ['expression', 'gives'], rows: [
        ['sku[:3]', "'ETH'"], ['sku[4:]', "'250'"], ['sku[-3:]', "'250'"], ['sku.split("-")', "['ETH', '250']"],
      ],
    },
    {
      type: 'group', id: 'convert', title: 'Text is not a number until you convert it', icon: 'workflow', tone: 'store', dir: 'row', children: [
        { type: 'item', id: 'as-str', title: "sku[4:] is '250'", sub: 'a str', icon: 'file' },
        { type: 'item', id: 'as-int', title: 'int(...) is 250', sub: 'an int', icon: 'boxes', tone: 'store' },
      ],
    },
    { type: 'note', id: 's-note', tone: 'ingest', text: 'A string is a sequence of characters you cannot change: every slice is a new string.' },
    { type: 'table', id: 'printed', title: 'main.py now prints', tone: 'store', rows: [['product: ETH 250 g']] },
    { type: 'item', id: 's-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['index from 0; -1 is the last', 'a slice stops before its end'] },
  ],
  edges: [{ from: 'as-str', to: 'as-int', label: 'int()' }],
})
