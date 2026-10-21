import type { Scene, SceneNode } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/why-python/03-philosophy/project/big_orders.py?raw'
import session from '../../../spine/why-python/03-philosophy/session.txt?raw'

const chip = (id: string, label: string): SceneNode => ({ id, label, variant: 'chip', pattern: 'storage', icon: 'none' })

export const philosophy: Scene = ideFrame(
  'python-zen',
  'why-python',
  [{ name: 'big_orders.py', state: 'active' }],
  { file: 'big_orders.py', code, highlight: [2, 3, 4], pattern: 'network', terminal: session },
  {
    id: 'python-zen-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'batteries',
        label: 'Batteries included',
        sub: 'the standard library ships with every Python',
        pattern: 'storage',
        icon: 'none',
        cols: 3,
        children: [
          chip('csv', 'csv'), chip('json', 'json'), chip('sqlite3', 'sqlite3'), chip('pathlib', 'pathlib'),
          chip('datetime', 'datetime'), chip('decimal', 'decimal'), chip('statistics', 'statistics'), chip('logging', 'logging'),
          chip('timeit', 'timeit'),
        ],
      },
      {
        id: 'community',
        kind: 'list',
        icon: 'scale',
        label: 'Decided in the open',
        pattern: 'user',
        items: [
          'Every change is a PEP — a Python Enhancement Proposal',
          'An elected Steering Council accepts or rejects them',
          'PyPI holds hundreds of thousands of third-party packages',
        ],
      },
    ],
  },
)
