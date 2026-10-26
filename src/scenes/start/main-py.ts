import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from './tree'
import code from '../../../spine/start/02-main/project/main.py?raw'
import session from '../../../spine/start/02-main/session.txt?raw'

// §2 — main.py, run from the terminal: a file is read top to bottom, and print writes one line.
export const startMain: SceneModel = ideFrame({
  tree: project('new'),
  editor: { file: 'main.py', code, highlight: [3, 4] },
  session,
  side: [
    {
      type: 'group', id: 'run', title: 'python main.py', icon: 'terminal', tone: 'ingest', children: [
        { type: 'item', id: 'run-file', title: 'main.py', sub: 'a text file', icon: 'file' },
        { type: 'item', id: 'run-python', title: 'python', sub: 'reads it, top to bottom', icon: 'python' },
        { type: 'item', id: 'run-term', title: 'the terminal', sub: 'where print writes', icon: 'screen' },
      ],
    },
    {
      type: 'table', id: 'lines', title: 'Line by line', tone: 'ingest', columns: ['line', 'what happens'], rows: [
        { id: 'l1', cells: ['1', 'a comment: Python skips it'] },
        { id: 'l2', cells: ['2', 'blank: nothing'] },
        { id: 'l3', cells: ['3', 'prints roastery-etl: starting'], tone: 'store' },
        { id: 'l4', cells: ['4', 'prints ETH-250 costs 9.95 a bag'], tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'args', title: 'Line 4 gives print three arguments', tone: 'store', columns: ['argument', 'a', 'printed as'], rows: [
        ['"ETH-250 costs"', 'str', 'ETH-250 costs'],
        ['9.95', 'float', '9.95'],
        ['"a bag"', 'str', 'a bag'],
        { id: 'joined', cells: ['joined by spaces', '', 'ETH-250 costs 9.95 a bag'], tone: 'store' },
      ],
    },
    { type: 'note', id: 'quotes', tone: 'store', text: 'Quotes mark where a string starts and ends; they are never printed.' },
  ],
  edges: [
    { from: 'run-file', to: 'run-python' },
    { from: 'run-python', to: 'run-term' },
  ],
})
