import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/how-python-runs/07-refcount/project/refs.py?raw'
import session from '../../../spine/how-python-runs/07-refcount/session.txt?raw'

export const refcountGc: Scene = ideFrame(
  'refcount-gc',
  'how-python-runs',
  [{ name: 'refs.py', state: 'active' }],
  { file: 'refs.py', code, highlight: [7, 10, 14, 16], pattern: 'network', terminal: session },
  {
    id: 'refcount-gc-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'counts',
        kind: 'table',
        label: 'References to the order dict',
        headers: ['after', 'real', 'getrefcount'],
        values: [
          ['order = {...}', '1', '2'],
          ['alias = order', '2', '3'],
          ['del alias', '1', '2'],
        ],
      },
      { id: 'plus-one', kind: 'note', pattern: 'service', label: 'getrefcount shows one extra: passing the object to the function is itself a reference' },
      {
        id: 'rules',
        kind: 'list',
        icon: 'trash',
        label: 'When an object goes away',
        pattern: 'storage',
        items: [
          'At zero references it is freed at once',
          'A cycle never reaches zero: loop holds itself',
          'The cycle collector finds such groups: gc.collect() freed 1',
        ],
      },
    ],
  },
)
