import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/how-python-runs/08-gil/project/gil.py?raw'
import session from '../../../spine/how-python-runs/08-gil/session.txt?raw'

// Timings change on every run (the step is volatile); the lists claim only what held on every run
// measured: no speed-up from threads on the default build, a clear one on python3.14t.
export const theGil: Scene = ideFrame(
  'the-gil',
  'how-python-runs',
  [{ name: 'gil.py', state: 'active' }],
  { file: 'gil.py', code, show: [[6, 22]], highlight: [12, 20, 21], pattern: 'network', terminal: session },
  {
    id: 'the-gil-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'default-facts', kind: 'list', icon: 'lock', label: 'With the GIL', sub: 'python: the default build', pattern: 'service', items: [
          'One thread runs Python bytecode at a time',
          'Two CPU-bound threads: no faster than one after another',
          'Threads waiting on files or the network still overlap',
        ],
      },
      {
        id: 'free-facts', kind: 'list', icon: 'cpu', label: 'Without the GIL', sub: 'python3.14t: the free-threaded build', pattern: 'network', items: [
          'Threads run bytecode on separate cores at the same time',
          'Experimental in 3.13, supported in 3.14',
          '3.14 documents a 5–10% cost for single-threaded code',
        ],
      },
    ],
  },
)
