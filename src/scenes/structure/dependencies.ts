import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/09-dependencies/project/pyproject.toml?raw'
import session from '../../../spine/structure/09-dependencies/session.txt?raw'

export const dependencies: Scene = ideFrame(
  'structure-dependencies',
  'roastery-etl',
  structureTree({ step: 9 }),
  { file: 'pyproject.toml', title: 'pyproject.toml', code, highlight: [2, 3, 5, 6, 9], terminal: session },
  {
    id: 'structure-dependencies-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'pyproject-parts',
        kind: 'table',
        label: 'pyproject.toml',
        headers: ["table", "says"],
        values: [
          ["[project]", "name, version, Python 3.14+"],
          ["dependencies", "none: standard library only"],
          ["dev", "mypy, pinned to 2.4.0"],
          ["[build-system]", "how pip builds it"],
        ],
      },
      {
        id: 'structure-dependencies-facts',
        kind: 'list',
        icon: 'plug',
        label: 'pip and .venv',
        pattern: 'user',
        items: [
          "pip install -e: the project, editable, into .venv",
          ".[dev] adds the tools only developers need",
          "Pinned versions: every machine gets the same tools",
        ],
      },
    ],
  },
)
