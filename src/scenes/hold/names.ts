import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import { names, obj } from './mem'
import code from '../../../spine/hold/01-names/project/main.py?raw'
import session from '../../../spine/hold/01-names/session.txt?raw'

// §1 — names and objects: a rebind moves an arrow (the REPL session: quantity, bags = (4, 3)).
export const holdNames: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [5, 6, 7] },
  session,
  side: [
    {
      type: 'group', id: 'before', title: 'After bags = quantity', icon: 'memory', tone: 'ingest', dir: 'row', children: [
        names('b-names', ['quantity', 'bags']),
        obj('b-3', 'int', [[3]]),
      ],
    },
    {
      type: 'group', id: 'after', title: 'After quantity = quantity + 1', icon: 'memory', tone: 'store', dir: 'row', children: [
        names('a-names', ['quantity', 'bags']),
        { type: 'group', id: 'a-objs', bare: true, children: [obj('a-4', 'int — a new object', [[4]], 'store'), obj('a-3', 'int', [[3]])] },
      ],
    },
    {
      type: 'table', id: 'main-names', title: "main.py's names", tone: 'ingest', columns: ['name', 'refers to', 'a'], rows: [
        ['sku', "'ETH-250'", 'str'], ['price', '9.95', 'float'], ['quantity', '3', 'int'],
      ],
    },
    { type: 'note', id: 'n-note', tone: 'ingest', text: 'Assignment binds a name to an object. quantity + 1 makes a new int; bags still refers to the old one.' },
    { type: 'table', id: 'answered', title: 'Python answers', tone: 'store', columns: ['typed', 'answer'], rows: [['quantity, bags', '(4, 3)']] },
    { type: 'item', id: 'n-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a name refers to an object', 'reassigning moves only that name'] },
  ],
  edges: [
    { from: 'b-names.quantity', to: 'b-3' },
    { from: 'b-names.bags', to: 'b-3' },
    { from: 'a-names.quantity', to: 'a-4' },
    { from: 'a-names.bags', to: 'a-3' },
  ],
})
