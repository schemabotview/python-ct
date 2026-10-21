import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { day, extractTree } from './tree'
import main from '../../../spine/extract/03-pathlib/project/main.py?raw'
import session from '../../../spine/extract/03-pathlib/session.txt?raw'

export const pathlibScene: Scene = ideFrame(
  'extract-pathlib',
  'roastery-etl',
  extractTree([day(1), day(2), day(3, { state: "new" })]),
  { file: 'main.py', code: main, highlight: [5, 8, 12, 14], terminal: session },
  {
    id: 'extract-pathlib-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'path-parts',
        kind: 'table',
        label: 'One Path, piece by piece',
        headers: ['attribute', 'value'],
        values: [
          ['name', 'orders-2026-10-01.csv'],
          ['stem', 'orders-2026-10-01'],
          ['suffix', '.csv'],
          ['parent', 'data/raw'],
        ],
      },
      {
        id: 'extract-pathlib-facts',
        kind: 'list',
        icon: 'folder',
        label: 'pathlib: paths as objects',
        pattern: 'storage',
        items: [
          'RAW / "catalogue.json" joins with the right separator',
          'glob("orders-*.csv") finds every day’s file',
          'sorted() puts them in date order: ISO dates sort as text',
          'Relative paths start from where you run the script',
        ],
      },
    ],
  },
)
