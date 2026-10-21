import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { shipTree } from './tree'
import code from '../../../spine/ship/05-finished/project/pipeline/run.py?raw'
import session from '../../../spine/ship/05-finished/session.txt?raw'

export const finished: Scene = ideFrame(
  'ship-finished',
  'roastery-etl',
  shipTree(5),
  { file: 'pipeline/run.py', title: 'pipeline/run.py', code, show: [[16, 23], [27, 34]], highlight: [16, 19, 22, 23], terminal: session },
  {
    id: 'ship-finished-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'built',
        kind: 'table',
        label: "Every file, and the course that built it",
        headers: ["file", "course"],
        values: [
          ["pipeline/extract.py", "6, 9"],
          ["pipeline/transform.py", "5, 7, 11"],
          ["pipeline/load.py", "8"],
          ["pipeline/models.py", "9"],
          ["tests/", "10"],
          ["pipeline/cli.py, config.py", "12"],
        ],
      },
      { id: 'ship-finished-note', kind: 'note', pattern: 'user', label: "One command checks it all: 12 tests, mypy and ruff, then the October run" },
    ],
  },
)
