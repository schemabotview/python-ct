import type { TreeEntry } from '@graphlearning/flow'

// Course 10 adds tests/ (1-3), pipeline/decorators.py (5), and a throwaway debug.py (6).
export function trustTree(step: number): TreeEntry[] {
  const active = (at: number[]) => (at.includes(step) ? { state: 'active' as const } : {})
  const fresh = (at: number) => (step === at ? { state: 'new' as const } : {})
  const tests = [
    { name: 'test_transform.py', ...fresh(1), ...active([1]) },
    ...(step >= 2 ? [{ name: 'test_extract.py', ...fresh(2), ...active([2]) }] : []),
    ...(step >= 3 ? [{ name: 'test_doubles.py', ...fresh(3), ...active([3]) }] : []),
  ]
  const pipeline = ['__init__.py', ...(step >= 5 ? ['decorators.py'] : []), 'extract.py', 'load.py', 'models.py', 'transform.py']
  return [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'data', folder: true, note: 'raw/, out/' },
    {
      name: 'pipeline',
      children: pipeline.map((name) => ({ name, ...(name === 'decorators.py' ? { ...fresh(5), ...active([5]) } : {}) })),
    },
    { name: 'tests', ...fresh(1), children: tests },
    ...(step === 6 ? [{ name: 'debug.py', state: 'active' as const }] : []),
    { name: 'main.py', ...active([4]) },
    { name: 'pyproject.toml', ...active([7]) },
    ...(step === 4 ? [{ name: 'run.log', state: 'new' as const }] : []),
    { name: 'schema.sql' },
  ]
}
