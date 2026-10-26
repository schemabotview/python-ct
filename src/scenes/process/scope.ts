import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/09-scope/project/main.py?raw'
import session from '../../../spine/process/09-scope/session.txt?raw'

// §9 — scope: to_cents reads CENT, found in the module's globals (LEGB). The REPL shows an
// assignment inside a function making a local: ('local', 'global').
export const processScope: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def to_cents', 'return amount.quantize'), show: [[1, 6], [lineOf(code, 'def to_cents'), lineOf(code, 'return to_cents')]] },
  session,
  side: [
    {
      type: 'group', id: 'legb', title: 'Where Python finds CENT, inside to_cents', icon: 'search', tone: 'ingest', children: [
        { type: 'item', id: 'l', title: 'Local', sub: 'to_cents: amount — no CENT', icon: 'file' },
        { type: 'item', id: 'e', title: 'Enclosing', sub: 'no function around it', icon: 'layers' },
        { type: 'item', id: 'g', title: 'Global', sub: "main.py's names: CENT is here", icon: 'check', tone: 'store' },
        { type: 'item', id: 'b', title: 'Built-in', sub: 'print, sum, sorted — never reached', icon: 'python' },
      ],
    },
    { type: 'table', id: 'typed', title: 'Assignment makes a local', tone: 'ingest', columns: ['typed', 'answer'], rows: [['show(), rate', "('local', 'global')"]] },
    { type: 'item', id: 'sc-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['reading searches L, E, G, B', 'assigning makes the name local'] },
    { type: 'note', id: 'rebind', tone: 'ingest', text: 'global and nonlocal can rebind an outer name; needing them usually means: pass it in, return it.' },
  ],
  edges: [{ from: 'l', to: 'e' }, { from: 'e', to: 'g' }, { from: 'g', to: 'b', label: 'only if not found' }],
})
