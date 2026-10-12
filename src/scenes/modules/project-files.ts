import type { Scene } from '@graphlearning/flow'

// §6 — the reporting project's layout with each file's job, and the pyproject.toml that declares it.
// The distribution name (orders-report) and the import package (orders) differ on purpose, repeating
// the lesson of the previous section on a project the learner has watched grow. The TOML parses with tomllib.
export const projectFiles: Scene = {
  id: 'project-files',
  title: 'Source, declaration, and environment',
  flow: 'TB',
  nodes: [
    {
      id: 'layout',
      kind: 'code',
      filename: 'project layout',
      label: `reporting/
    pyproject.toml        # what the project is and needs
    requirements.txt      # exact versions that were tested
    .venv/                # the environment: not committed
    orders.csv
    orders/               # the import package
        __init__.py
        calc.py
        loader.py
        cli.py`,
    },
    {
      id: 'toml',
      kind: 'code',
      filename: 'pyproject.toml',
      label: `[project]
name = "orders-report"          # distribution name: pip install orders-report
version = "0.1.0"
requires-python = ">=3.14"      # which interpreters it supports
dependencies = [
    "python-dateutil>=2.9",     # a range of acceptable versions
]`,
    },
  ],
  edges: [{ source: 'layout', target: 'toml', label: 'declared in' }],
}
