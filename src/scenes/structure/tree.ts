import type { TreeEntry } from '@graphlearning/flow'

// Course 9 takes main.py apart: extract.py (1), the pipeline/ package (2), models.py (4), and
// pyproject.toml (9). Each step's tree is that spine snapshot after its run.
const pkg = (step: number): TreeEntry => {
  const active = step === 3 ? 'extract.py' : step === 8 ? 'transform.py' : step >= 4 && step <= 7 ? 'models.py' : ''
  const files = ['__init__.py', 'extract.py', 'load.py', ...(step >= 4 ? ['models.py'] : []), 'transform.py']
  return {
    name: 'pipeline',
    ...(step === 2 ? { state: 'new' as const } : {}),
    children: files.map((name) => ({
      name,
      ...(name === active ? { state: 'active' as const } : name === 'models.py' && step === 4 ? { state: 'new' as const } : {}),
    })),
  }
}

export function structureTree({ step }: { step: number }): TreeEntry[] {
  const main: TreeEntry = { name: 'main.py', ...(step <= 2 ? { state: 'active' as const } : {}) }
  return [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    ...(step === 1 ? [{ name: '__pycache__', children: [{ name: 'extract.cpython-314.pyc', state: 'new' as const }] }] : []),
    { name: 'data', folder: true, note: 'raw/, out/' },
    ...(step === 1 ? [{ name: 'extract.py', state: 'new' as const }] : [pkg(step)]),
    ...(step === 8 ? [{ name: 'check.py', state: 'new' as const }] : []),
    main,
    ...(step === 9 ? [{ name: 'pyproject.toml', state: 'active' as const }] : []),
    { name: 'schema.sql' },
  ]
}
