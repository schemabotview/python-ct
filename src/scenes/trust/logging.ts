import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { trustTree } from './tree'
import code from '../../../spine/trust/04-logging/project/main.py?raw'
import session from '../../../spine/trust/04-logging/session.txt?raw'

export const loggingScene: Scene = ideFrame(
  'trust-logging',
  'roastery-etl',
  trustTree(4),
  { file: 'main.py', title: 'main.py', code, show: [[1, 1], [3, 3], [9, 15], [26, 31], [34, 35]], highlight: [3, 9, 10, 15, 27, 29], terminal: session },
  {
    id: 'trust-logging-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'levels',
        kind: 'table',
        label: "Five levels, lowest first",
        headers: ["level", "for"],
        values: [
          ["DEBUG", "details while developing"],
          ["INFO", "what the run did"],
          ["WARNING", "something to look at"],
          ["ERROR", "a step failed"],
          ["CRITICAL", "the job cannot go on"],
        ],
      },
      {
        id: 'trust-logging-facts',
        kind: 'list',
        icon: 'scroll',
        label: "logging, not print",
        pattern: 'network',
        items: [
          "basicConfig once, in main(): level and format",
          "Logs go to stderr, apart from any output",
          "2> run.log keeps the log in a file",
          "Each module asks getLogger for its own logger",
        ],
      },
    ],
  },
)
