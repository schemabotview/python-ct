import type { TreeEntry } from '@graphlearning/flow'

// Course 11 adds bench/: one measuring script per section, run with python -m bench.<name>.
const BENCH: [string, number][] = [
  ['profile.py', 1], ['memory.py', 3], ['bound.py', 4], ['threads.py', 5], ['parallel.py', 6], ['fetch.py', 7],
]
const OPEN: Record<number, string> = { 3: 'memory.py', 4: 'bound.py', 5: 'threads.py', 6: 'parallel.py', 7: 'fetch.py' }

export function speedTree(step: number): TreeEntry[] {
  const bench = BENCH.filter(([, at]) => at <= step).map(([name, at]) => ({
    name,
    ...(OPEN[step] === name ? { state: 'active' as const } : at === step ? { state: 'new' as const } : {}),
  }))
  const pipeline = ['__init__.py', 'decorators.py', 'extract.py', 'load.py', 'models.py', 'transform.py']
  return [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'bench', ...(step === 1 ? { state: 'new' as const } : {}), children: bench },
    { name: 'data', folder: true, note: 'raw/, out/' },
    {
      name: 'pipeline',
      children: pipeline.map((name) => ({ name, ...(name === 'transform.py' && step <= 2 ? { state: 'active' as const } : {}) })),
    },
    { name: 'tests', folder: true },
    { name: 'main.py' },
    { name: 'pyproject.toml' },
    { name: 'schema.sql' },
  ]
}
