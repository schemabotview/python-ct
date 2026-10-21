import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'

// The finished project as the plan describes it (PYTHON-COURSE-PLAN.md). Nothing here runs yet —
// this frame is the map, so the editor's place holds what each part is for, not code.
export const projectTour: Scene = ideFrame(
  'project-tour',
  'roastery-etl',
  [
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
  {
    id: 'parts',
    kind: 'table',
    label: 'What each part is for, and where we build it',
    headers: ['part', 'its job', 'course'],
    values: [
      ['.venv/', 'its own Python and packages', '3'],
      ['main.py', 'the script we run', '3 → 8'],
      ['data/raw/', "the shop's orders and catalogue", '6'],
      ['data/out/', 'the report and the database', '8'],
      ['pipeline/', 'the code, split into modules', '9'],
      ['models.py', 'Order, LineItem, Product', '9'],
      ['extract.py', 'read and validate the raw files', '6 → 9'],
      ['transform.py', 'price and aggregate', '5, 7 → 9'],
      ['load.py', 'write the report and database', '8 → 9'],
      ['config.py', 'paths and settings', '12'],
      ['tests/', 'checks run on every change', '10'],
      ['pyproject.toml', 'the project and its command', '9 → 12'],
    ],
  },
  {
    id: 'legend',
    kind: 'list',
    pills: true,
    icon: 'folder',
    label: 'Reading every lesson',
    sub: 'the same panels, always',
    pattern: 'network',
    items: [
      'Left: the project, as your editor shows it',
      'NEW marks a file this lesson adds',
      'The highlighted file is the one open in the editor',
      'Dimmed entries are generated, never edited by hand',
      'Centre: the code, this lesson’s lines highlighted',
      'Below it: the terminal, exactly as it really ran',
    ],
  },
)
