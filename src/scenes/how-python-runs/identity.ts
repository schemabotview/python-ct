import type { Scene, SceneNode } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/how-python-runs/06-identity/project/identity.py?raw'
import session from '../../../spine/how-python-runs/06-identity/session.txt?raw'

// The identities are memory addresses and change on every run (the step is volatile), so the tables
// read them from the same transcript the terminal shows.
const [idA, idB] = session.split('\n')[3].split(' ')

const object = (id: string, label: string, address: string): SceneNode => ({
  id, kind: 'table', label, headers: ['', ''],
  values: [['identity', address], ['type', 'list'], ['value', "['ETH-250', 'COL-500']"]],
})

export const objectsHeap: Scene = ideFrame(
  'objects-heap',
  'how-python-runs',
  [{ name: 'identity.py', state: 'active' }],
  { file: 'identity.py', code, highlight: [4, 5], pattern: 'network', terminal: session },
  {
    id: 'objects-heap-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'heap',
        label: 'Two objects on the heap',
        sub: 'equal values, different identities',
        pattern: 'storage',
        icon: 'none',
        gap: 'tight',
        children: [object('obj-a', 'the object a refers to', idA), object('obj-b', 'the object b refers to', idB)],
      },
      {
        id: 'compare',
        kind: 'table',
        label: 'Two questions',
        headers: ['test', 'asks', 'here'],
        values: [
          ['a == b', 'same value?', 'True'],
          ['a is b', 'same object?', 'False'],
        ],
      },
    ],
  },
)
