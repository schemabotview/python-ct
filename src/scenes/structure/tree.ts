import type { TreeEntry } from '@graphlearning/graphl-flow'
import { venvClosed } from '../start/tree'

// The explorer from Course 8 on: data/ folds to one line (Course 7 showed raw and out), and the code
// is what grows. `files` are project paths; those under pipeline/, tests/ or bench/ draw inside that
// folder (sorted, as an editor lists them), `fresh` may name a folder ('pipeline/') to mark it new,
// and `closed` folders draw collapsed (Course 12's tree is taller than the explorer).
export function codeTree(files: string[], { active, fresh = [], closed = [] }: { active: string; fresh?: string[]; closed?: string[] }): TreeEntry[] {
  const entry = (path: string, name = path): TreeEntry => ({ name, state: path === active ? 'active' : fresh.includes(path) ? 'new' : undefined })
  const folder = (dir: string): TreeEntry[] => {
    const inside = files.filter((f) => f.startsWith(`${dir}/`)).sort()
    if (!inside.length) return []
    if (closed.includes(dir)) return [{ name: dir, folder: true }]
    return [{ name: dir, state: fresh.includes(`${dir}/`) ? 'new' : undefined, children: inside.map((f) => entry(f, f.slice(dir.length + 1))) }]
  }
  return [
    venvClosed,
    { name: 'data', folder: true, state: 'muted', note: 'raw and out' },
    ...folder('pipeline'),
    ...folder('tests'),
    ...folder('bench'),
    ...files.filter((f) => !f.includes('/')).map((f) => entry(f)),
  ]
}

export const PACKAGE = ['pipeline/__init__.py', 'pipeline/extract.py', 'pipeline/load.py', 'pipeline/transform.py', 'pipeline/validate.py']
export const MODEL = ['pipeline/model.py', 'pipeline/errors.py', 'pipeline/ports.py', 'pipeline/run.py']
