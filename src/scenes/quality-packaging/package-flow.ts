import type { Scene } from '@graphlearning/flow'

// §8 — the declaration and the local build, install, run and uninstall that was actually performed, in a
// throwaway directory and a fresh virtual environment, with no network and nothing published. The build
// needed a current setuptools: the system's older, distribution-patched copy failed on this Python.
export const packageFlow: Scene = {
  id: 'package-flow',
  title: 'From source tree to installed command',
  flow: 'TB',
  nodes: [
    {
      id: 'declaration',
      kind: 'code',
      filename: 'pyproject.toml',
      label: `[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "orders-report"
version = "0.1.0"
requires-python = ">=3.10"

[project.scripts]
orders-report = "orders_report.cli:main"     # creates the orders-report command`,
    },
    {
      id: 'flow',
      kind: 'code',
      filename: 'terminal  (illustration of a verified local run)',
      label: `python -m pip wheel --no-deps -w dist .       # builds orders_report-0.1.0-py3-none-any.whl
python -m venv .venv && .venv/bin/python -m pip install dist/*.whl
.venv/bin/orders-report orders.csv --tax 0.2  # would read orders.csv with tax 0.2   (exit 0)
.venv/bin/python -m pip uninstall -y orders-report   # the command is gone`,
    },
  ],
  edges: [{ source: 'declaration', target: 'flow', label: 'build, install, run' }],
}
