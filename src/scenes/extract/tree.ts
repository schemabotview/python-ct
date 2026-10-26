import type { TreeEntry } from '@graphlearning/graphl-flow'
import { venvClosed } from '../start/tree'

// The explorer from Course 5 on: data/raw appears and grows. `fresh` marks files this step added or
// changed; `more` collapses the rest of the month into one muted line (31 files do not fit a pane).
export function dataTree(raw: string[], { fresh = [], more, active = 'main.py' }: { fresh?: string[]; more?: string; active?: string } = {}): TreeEntry[] {
  const file = (name: string): TreeEntry => ({ name, state: name === active ? 'active' : fresh.includes(name) ? 'new' : undefined })
  return [
    venvClosed,
    { name: 'data', children: [{ name: 'raw', children: [...raw.map(file), ...(more ? [{ name: more, state: 'muted' as const }] : [])] }] },
    file('main.py'),
  ]
}

export const DAYS_1_3 = ['orders-2026-10-01.csv', 'orders-2026-10-02.csv', 'orders-2026-10-03.csv']
