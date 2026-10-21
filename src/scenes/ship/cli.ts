import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { shipTree } from './tree'
import code from '../../../spine/ship/01-cli/project/pipeline/cli.py?raw'
import session from '../../../spine/ship/01-cli/session.txt?raw'

export const cli: Scene = ideFrame(
  'ship-cli',
  'roastery-etl',
  shipTree(1),
  { file: 'pipeline/cli.py', title: 'pipeline/cli.py', code, show: [[8, 9], [22, 37]], highlight: [23, 26, 27, 28, 33], terminal: session },
  {
    id: 'ship-cli-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'cli-parts',
        kind: 'table',
        label: "argparse builds the command",
        headers: ["piece", "gives you"],
        values: [
          ["ArgumentParser", "usage, --help, errors"],
          ["add_subparsers", "roastery-etl run ..."],
          ["type=month", "a checked YYYY-MM"],
          ["--version", "the installed version"],
        ],
      },
      {
        id: 'ship-cli-facts',
        kind: 'list',
        icon: 'terminal',
        label: "A command, not a script",
        pattern: 'user',
        items: [
          "main.py became pipeline/run.py and pipeline/cli.py",
          "A bad month is refused before anything runs",
          "No --month: last month, from month_to_process()",
          "main() returns the exit code",
        ],
      },
    ],
  },
)
