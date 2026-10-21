import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { trustTree } from './tree'
import code from '../../../spine/trust/07-ruff/project/pyproject.toml?raw'
import session from '../../../spine/trust/07-ruff/session.txt?raw'

export const ruffScene: Scene = ideFrame(
  'trust-ruff',
  'roastery-etl',
  trustTree(7),
  { file: 'pyproject.toml', title: 'pyproject.toml', code, show: [[1, 2], [8, 22]], highlight: [9, 21, 22], terminal: session },
  {
    id: 'trust-ruff-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'trust-ruff-facts',
        kind: 'list',
        icon: 'wrench',
        label: "ruff: linter and formatter",
        pattern: 'network',
        items: [
          "ruff check finds bugs and needless code",
          "FURB157: Decimal(0), not Decimal(\"0\")",
          "--fix applies the fixes that are safe",
          "ruff format: one style, nothing to argue about",
          "line-length = 80: PEP 8, and this editor",
        ],
      },
      { id: 'trust-ruff-note', kind: 'note', pattern: 'network', label: "Before every commit: pytest for behaviour, mypy for types, ruff for style" },
    ],
  },
)
