import type { TreeEntry } from '@graphlearning/graphl-flow'
import { venvClosed } from '../start/tree'

// The explorer from Course 8 on: data/ folds to one line (Course 7 showed raw and out), and the code
// is what grows. `files` are project paths; those under pipeline/ draw inside the package folder.
export function codeTree(files: string[], { active, fresh = [] }: { active: string; fresh?: string[] }): TreeEntry[] {
  const entry = (path: string, name = path): TreeEntry => ({ name, state: path === active ? 'active' : fresh.includes(path) ? 'new' : undefined })
  const pkg = files.filter((f) => f.startsWith('pipeline/')).sort()
  return [
    venvClosed,
    { name: 'data', folder: true, state: 'muted', note: 'raw and out' },
    ...(pkg.length ? [{ name: 'pipeline', state: fresh.includes('pipeline/') ? 'new' as const : undefined, children: pkg.map((f) => entry(f, f.slice('pipeline/'.length))) }] : []),
    ...files.filter((f) => !f.startsWith('pipeline/')).map((f) => entry(f)),
  ]
}

export const PACKAGE = ['pipeline/__init__.py', 'pipeline/extract.py', 'pipeline/load.py', 'pipeline/transform.py', 'pipeline/validate.py']
