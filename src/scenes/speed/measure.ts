import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { speedTree } from './tree'
import code from '../../../spine/speed/01-measure/project/pipeline/transform.py?raw'
import session from '../../../spine/speed/01-measure/session.txt?raw'

// Every number in this course's terminals is a timing or a memory peak: the step is volatile (replayed
// with digits masked), and the side panes and narration claim only what held on every run.
export const measure: Scene = ideFrame(
  'speed-measure',
  'roastery-etl',
  speedTree(1),
  { file: 'pipeline/transform.py', title: 'pipeline/transform.py', code, show: [[1, 1], [26, 35]], highlight: [28, 31, 32], terminal: session },
  {
    id: 'speed-measure-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'speed-measure-facts',
        kind: 'list',
        icon: 'gauge',
        label: "Measure before changing anything",
        pattern: 'service',
        items: [
          "timeit: how long the whole run takes, best of three",
          "cProfile: how long each function took, and how often",
          "drop_duplicates: most of the run, in one place",
          "A guess would have blamed the files or the database",
        ],
      },
      { id: 'speed-measure-note', kind: 'note', pattern: 'service', label: "drop_duplicates is new: the shop sometimes sends an order twice" },
    ],
  },
)
