import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { speedTree } from './tree'
import code from '../../../spine/speed/02-data-structure/project/pipeline/transform.py?raw'
import session from '../../../spine/speed/02-data-structure/session.txt?raw'

// Every number in this course's terminals is a timing or a memory peak: the step is volatile (replayed
// with digits masked), and the side panes and narration claim only what held on every run.
export const dataStructure: Scene = ideFrame(
  'speed-data-structure',
  'roastery-etl',
  speedTree(2),
  { file: 'pipeline/transform.py', title: 'pipeline/transform.py', code, show: [[1, 1], [26, 35]], highlight: [28, 31, 32], terminal: session },
  {
    id: 'speed-data-structure-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'in-cost',
        kind: 'table',
        label: "\"ORD-5999\" in 6,000 order IDs",
        headers: ["container", "how in finds it"],
        values: [
          ["list", "compares items one by one"],
          ["set", "one hash, straight to it"],
        ],
      },
      {
        id: 'speed-data-structure-facts',
        kind: 'list',
        icon: 'zap',
        label: "Two words changed",
        pattern: 'service',
        items: [
          "[] became set(); append became add",
          "The answer is identical; only the time changed",
          "The whole run is now several times faster",
          "Choose the structure for the question you ask it",
        ],
      },
    ],
  },
)
