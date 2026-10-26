import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { PROJECT, files } from './lab'
import code from '../../../spine/picture/10-identity/project/identity.py?raw'
import session from '../../../spine/picture/10-identity/session.txt?raw'

// §10 — names and objects: ids are addresses that change every run (a volatile step), so the tables
// read them from the transcript the terminal shows. a and b share one id; c has its own. Each list is
// ONE row: drawn element by element, the two arrows landed on 'ETH-250' and 'COL-500' and read as
// a pointing at one element and b at the other.
const [idA, idB, idC] = session.split('\n')[1].split(' ')

export const heap: SceneModel = ideFrame({
  project: PROJECT,
  tree: files(['identity.py'], 'identity.py'),
  editor: { file: 'identity.py', code, highlight: [1, 2, 3] },
  session,
  side: [
    {
      type: 'group', id: 'shared', title: 'b = a binds a second name', icon: 'memory', tone: 'store', dir: 'row', children: [
        { type: 'table', id: 'names-ab', title: 'names', rows: [['a', '●'], ['b', '●']] },
        { type: 'table', id: 'obj-1', title: `list — id ${idA}`, rows: [["['ETH-250', 'COL-500']"]] },
      ],
    },
    {
      type: 'group', id: 'separate', title: 'c is a second list, equal in value', icon: 'memory', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'names-c', title: 'names', rows: [['c', '●']] },
        { type: 'table', id: 'obj-2', title: `list — id ${idC}`, rows: [["['ETH-250', 'COL-500']"]] },
      ],
    },
    {
      type: 'table', id: 'asked', title: 'What identity.py printed', tone: 'ingest', columns: ['asks', 'a, b', 'a, c'], rows: [
        ['the same id?', idA === idB ? 'yes' : 'no', idA === idC ? 'yes' : 'no'],
        ['is: one object?', 'True', 'False'],
        ['==: equal values?', 'True', 'True'],
      ],
    },
    {
      type: 'table', id: 'three', title: 'Three things every object has — the list a names', tone: 'store', columns: ['', ''], rows: [
        ['identity', `id(a) = ${idA}`],
        ['type', 'list'],
        ['value', "['ETH-250', 'COL-500']"],
      ],
    },
    { type: 'item', id: 'remember', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['b = a copies nothing', 'use == for values; is mostly for None'] },
    { type: 'note', id: 'heap-note', tone: 'ingest', text: 'is compares identities: one object or two. == compares values. In CPython the identity is the address in memory.' },
  ],
  edges: [{ from: 'names-ab.a', to: 'obj-1' }, { from: 'names-ab.b', to: 'obj-1' }, { from: 'names-c.c', to: 'obj-2' }],
})
