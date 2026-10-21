import type { TreeEntry } from '@graphlearning/flow'

// Course 8 adds what the pipeline writes: data/out/, and from section 4 the database's schema.sql.
export function loadTree({ out = [], schema = false }: { out?: TreeEntry[]; schema?: boolean }): TreeEntry[] {
  return [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'data/raw', folder: true, note: '31 days + catalogue' },
    ...(out.length ? [{ name: 'data/out', children: out }] : []),
    { name: 'main.py', state: 'active' },
    ...(schema ? [{ name: 'schema.sql', ...(out.some((f) => f.name === 'warehouse.db' && f.state === 'new') ? { state: 'new' as const } : {}) }] : []),
  ]
}
