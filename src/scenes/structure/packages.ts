import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/02-packages/project/main.py?raw'
import session from '../../../spine/structure/02-packages/session.txt?raw'

export const packages: Scene = ideFrame(
  'structure-packages',
  'roastery-etl',
  structureTree({ step: 2 }),
  { file: 'main.py', title: 'main.py', code, show: [[1, 13], [21, 26]], highlight: [3, 4, 5], terminal: session },
  {
    id: 'structure-packages-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'structure-packages-facts',
        kind: 'list',
        icon: 'package',
        label: 'A package is a folder of modules',
        sub: 'pipeline/',
        pattern: 'user',
        items: [
          "__init__.py marks the folder, and runs on first import",
          "pipeline.extract: the package, a dot, the module",
          "One module per stage: extract, transform, load",
          "main.py is left with only the story",
        ],
      },
      { id: 'structure-packages-note', kind: 'note', pattern: 'user', label: 'Imports are absolute, from the project root: run from there' },
    ],
  },
)
