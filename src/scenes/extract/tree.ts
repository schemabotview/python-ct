import type { TreeEntry } from '@graphlearning/flow'

// Course 6 gives the project its data: data/raw/ holds the shop's daily files and the catalogue.
export const extractTree = (days: TreeEntry[]): TreeEntry[] => [
  { name: '.venv', folder: true, state: 'muted', note: 'activated' },
  { name: 'data/raw', children: [{ name: 'catalogue.json' }, ...days] },
  { name: 'main.py', state: 'active' },
]

export const day = (n: number, extra: Partial<TreeEntry> = {}): TreeEntry => ({ name: `orders-2026-10-0${n}.csv`, ...extra })
