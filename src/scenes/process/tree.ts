import type { TreeEntry } from '@graphlearning/flow'

// Course 5 still works in main.py: the rules, loops and functions that will become transform.py.
export const PROCESS_TREE: TreeEntry[] = [
  { name: '.venv', folder: true, state: 'muted', note: 'activated' },
  { name: 'main.py', state: 'active' },
]
