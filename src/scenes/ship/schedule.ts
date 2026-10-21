import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { shipTree } from './tree'
import code from '../../../spine/ship/04-schedule/project/deploy/run.sh?raw'
import session from '../../../spine/ship/04-schedule/session.txt?raw'

export const schedule: Scene = ideFrame(
  'ship-schedule',
  'roastery-etl',
  shipTree(4),
  { file: 'deploy/run.sh', title: 'deploy/run.sh', code, highlight: [3, 6, 7, 8, 9], terminal: session },
  {
    id: 'ship-schedule-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'exit-codes',
        kind: 'table',
        label: "Exit codes a scheduler can act on",
        headers: ["code", "means", "here"],
        values: [
          ["0", "success", "October loaded"],
          ["1", "the job failed", "no orders"],
          ["2", "bad usage", "argparse: '13'"],
        ],
      },
      {
        id: 'cron-fields',
        kind: 'table',
        label: "The crontab line: 17 6 2 * *",
        headers: ["field", "value"],
        values: [
          ["minute", "17"],
          ["hour", "6"],
          ["day of month", "2"],
          ["month, weekday", "every"],
        ],
      },
    ],
  },
)
