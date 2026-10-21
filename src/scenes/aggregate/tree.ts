import type { TreeEntry } from '@graphlearning/flow'

// Course 7 works on the whole of October, as Course 6's last section left it.
export const aggregateTree: TreeEntry[] = [
  { name: '.venv', folder: true, state: 'muted', note: 'activated' },
  {
    name: 'data/raw',
    children: [
      { name: 'catalogue.json' },
      { name: 'orders-2026-10-01.csv' },
      { name: 'orders-2026-10-02.csv' },
      { name: '… 28 more days', state: 'muted' },
      { name: 'orders-2026-10-31.csv' },
    ],
  },
  { name: 'main.py', state: 'active' },
]
