import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/01-modules/project/main.py?raw'
import session from '../../../spine/structure/01-modules/session.txt?raw'

export const modules: Scene = ideFrame(
  'structure-modules',
  'roastery-etl',
  structureTree({ step: 1 }),
  { file: 'main.py', title: 'main.py', code, show: [[1, 10], [79, 84], [97, 97]], highlight: [10, 82], terminal: session },
  {
    id: 'structure-modules-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'import-steps',
        kind: 'table',
        label: 'What import extract does',
        headers: ["", ""],
        values: [
          ["finds", "extract.py, next to main.py"],
          ["runs", "its top level, once"],
          ["caches", "sys.modules, and __pycache__"],
          ["binds", "month_rows, in main.py"],
        ],
      },
      {
        id: 'structure-modules-facts',
        kind: 'list',
        icon: 'boxes',
        label: 'A module is a .py file',
        pattern: 'user',
        items: [
          "Its top level runs once, on first import",
          "Defining a function only creates it",
          "extract.py now holds the E of ETL",
          "main.py keeps T and L, folded here",
        ],
      },
    ],
  },
)
