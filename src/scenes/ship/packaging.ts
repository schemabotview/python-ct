import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { shipTree } from './tree'
import code from '../../../spine/ship/03-packaging/project/pyproject.toml?raw'
import session from '../../../spine/ship/03-packaging/session.txt?raw'

export const packaging: Scene = ideFrame(
  'ship-packaging',
  'roastery-etl',
  shipTree(3),
  { file: 'pyproject.toml', title: 'pyproject.toml', code, show: [[1, 6], [11, 20]], highlight: [3, 15, 16, 20], terminal: session },
  {
    id: 'ship-packaging-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'ship-packaging-facts',
        kind: 'list',
        icon: 'package',
        label: "A wheel and a clean install",
        pattern: 'user',
        items: [
          "pip wheel builds dist/roastery_etl-1.0.0-...whl",
          "[project.scripts] makes the roastery-etl command",
          "A brand-new venv installs it and runs it",
          "schema.sql now ships inside the package",
        ],
      },
      { id: 'ship-packaging-note', kind: 'note', pattern: 'warn', label: "The clean install is the real test: schema.sql outside the package would have been missing from the wheel" },
    ],
  },
)
