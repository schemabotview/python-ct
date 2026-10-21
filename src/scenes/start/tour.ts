import type { Scene } from '@graphlearning/flow'

// The finished project as the plan describes it (PYTHON-COURSE-PLAN.md). Nothing here runs yet —
// this frame is the map, so it shows names and jobs only, no output.
export const projectTour: Scene = {
  id: 'project-tour',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  stretch: true,
  gap: 'tight',
  nodes: [
    {
      id: 'explorer',
      kind: 'tree',
      label: 'roastery-etl',
      tree: [
        { name: '.venv', folder: true, state: 'muted', note: "the project's own Python" },
        {
          name: 'data',
          children: [
            { name: 'raw', children: [{ name: 'orders-2026-10-01.csv' }, { name: 'catalogue.json' }] },
            { name: 'out', children: [{ name: 'daily_report.csv' }, { name: 'warehouse.db' }] },
          ],
        },
        {
          name: 'pipeline',
          children: [
            { name: '__init__.py' },
            { name: 'models.py' },
            { name: 'extract.py' },
            { name: 'transform.py' },
            { name: 'load.py' },
            { name: 'config.py' },
          ],
        },
        { name: 'tests', folder: true, note: 'pytest' },
        { name: 'main.py', state: 'active' },
        { name: 'pyproject.toml' },
      ],
    },
    {
      id: 'parts',
      kind: 'table',
      label: 'What each part is for, and where we build it',
      headers: ['part', 'its job', 'course'],
      values: [
        ['.venv/', "this project's own Python and packages", '3'],
        ['main.py', 'the script we run — the pipeline grows here first', '3 → 8'],
        ['data/raw/', "the shop's daily orders and the catalogue", '6'],
        ['data/out/', 'the report and the SQLite database we write', '8'],
        ['pipeline/', 'the code, split into modules once it is big enough', '9'],
        ['models.py', 'Order, LineItem and Product as classes', '9'],
        ['extract.py', 'read and validate the raw files', '6 → 9'],
        ['transform.py', 'price the lines and aggregate revenue', '5, 7 → 9'],
        ['load.py', 'write the report and the database', '8 → 9'],
        ['config.py', 'paths and settings, never hard-coded', '12'],
        ['tests/', 'checks that run on every change', '10'],
        ['pyproject.toml', 'the project, its dependencies, its command', '9 → 12'],
      ],
    },
  ],
  edges: [],
}
