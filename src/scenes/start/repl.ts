import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from './tree'
import code from '../../../spine/start/03-repl/project/main.py?raw'
import session from '../../../spine/start/03-repl/session.txt?raw'

// §3 — the REPL beside the editor: try a line, then write it down. Every answer is the session's.
export const startRepl: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [5] },
  session,
  side: [
    {
      type: 'group', id: 'loop', title: 'python -q: the REPL', icon: 'terminal', tone: 'ingest', children: [
        { type: 'item', id: 'read', title: 'Read', sub: 'the line you type', icon: 'file' },
        { type: 'item', id: 'eval', title: 'Evaluate', sub: 'Python runs it', icon: 'cpu' },
        { type: 'item', id: 'print', title: 'Print', sub: 'its value, back', icon: 'screen' },
      ],
    },
    {
      type: 'table', id: 'typed', title: 'Typed at >>>', tone: 'ingest', columns: ['typed', 'Python answers'], rows: [
        ['9.95', '9.95'],
        { cells: ['9.95 * 3', '29.849999999999998'], tone: 'consume' },
        ['"ETH-250"[:3]', "'ETH'"],
      ],
    },
    {
      type: 'table', id: 'versus', title: 'The REPL and the file', tone: 'ingest', columns: ['', 'the REPL', 'main.py'], rows: [
        ['runs', 'one line at a time', 'the whole file, in order'],
        ['shows', 'every value', 'only what you print'],
        ['keeps', 'nothing, after exit()', 'every line, saved'],
        ['for', 'trying a line', 'the pipeline'],
      ],
    },
    { type: 'note', id: 'repl-note', tone: 'consume', text: '29.849999999999998, not 29.85: a float cannot hold 9.95 exactly. The money is wrong, and Course 3 fixes it with Decimal.' },
  ],
  edges: [
    { from: 'read', to: 'eval' },
    { from: 'eval', to: 'print' },
  ],
})
