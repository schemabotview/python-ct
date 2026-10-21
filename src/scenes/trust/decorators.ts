import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { trustTree } from './tree'
import code from '../../../spine/trust/05-decorators/project/pipeline/decorators.py?raw'
import session from '../../../spine/trust/05-decorators/session.txt?raw'

export const decorators: Scene = ideFrame(
  'trust-decorators',
  'roastery-etl',
  trustTree(5),
  { file: 'pipeline/decorators.py', title: 'pipeline/decorators.py', code, show: [[24, 37], [44, 45], [51, 51]], highlight: [24, 26, 28, 36, 37, 44], terminal: session },
  {
    id: 'trust-decorators-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'what-at-does',
        kind: 'table',
        label: "What @ does",
        headers: ["you write", "Python runs"],
        values: [
          ["@retry(times=3)", "f = retry(3)(f)"],
          ["@timed", "f = timed(f)"],
        ],
      },
      {
        id: 'trust-decorators-facts',
        kind: 'list',
        icon: 'repeat',
        label: "A decorator wraps a function",
        pattern: 'network',
        items: [
          "wrapper is a closure: it remembers func and times",
          "Two failures, then the third call succeeds",
          "functools.wraps keeps the real name",
          "@timed, folded above, logs each call’s duration",
        ],
      },
    ],
  },
)
