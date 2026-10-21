import type { TreeEntry } from '@graphlearning/flow'

// Course 12: main.py becomes pipeline/run.py + cli.py (1), config.py and .gitignore (2), schema.sql moves
// into the package and dist/ holds the wheel (3), deploy/run.sh (4).
export function shipTree(step: number): TreeEntry[] {
  const open: Record<number, string> = { 1: 'cli.py', 2: 'config.py', 5: 'run.py' }
  const pipeline = [
    '__init__.py', 'cli.py', ...(step >= 2 ? ['config.py'] : []), 'decorators.py', 'extract.py', 'load.py', 'models.py',
    'run.py', ...(step >= 3 ? ['schema.sql'] : []), 'transform.py',
  ]
  const born: Record<string, number> = { 'cli.py': 1, 'run.py': 1, 'config.py': 2, 'schema.sql': 3 }
  return [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'bench', folder: true },
    { name: 'data', folder: true, note: 'raw/, out/' },
    ...(step >= 4 ? [{ name: 'deploy', children: [{ name: 'run.sh', ...(step === 4 ? { state: 'active' as const } : {}) }] }] : []),
    ...(step === 3 ? [{ name: 'dist', state: 'new' as const, children: [{ name: 'roastery_etl-1.0.0-…whl' }] }] : []),
    { name: 'pipeline', children: pipeline.map((name) => ({ name, ...(open[step] === name ? { state: 'active' as const } : born[name] === step ? { state: 'new' as const } : {}) })) },
    { name: 'tests', folder: true },
    ...(step >= 2 ? [{ name: '.gitignore', ...(step === 2 ? { state: 'new' as const } : {}) }] : []),
    { name: 'pyproject.toml', ...(step === 3 ? { state: 'active' as const } : {}) },
    ...(step <= 2 ? [{ name: 'schema.sql' }] : []),
  ]
}
