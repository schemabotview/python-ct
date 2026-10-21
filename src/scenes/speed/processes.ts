import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { speedTree } from './tree'
import code from '../../../spine/speed/06-processes/project/bench/parallel.py?raw'
import session from '../../../spine/speed/06-processes/session.txt?raw'

// Every number in this course's terminals is a timing or a memory peak: the step is volatile (replayed
// with digits masked), and the side panes and narration claim only what held on every run.
export const processes: Scene = ideFrame(
  'speed-processes',
  'roastery-etl',
  speedTree(6),
  { file: 'bench/parallel.py', title: 'bench/parallel.py', code, show: [[26, 27], [30, 39], [42, 45]], highlight: [26, 34, 35, 42], terminal: session },
  {
    id: 'speed-processes-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'speed-processes-facts',
        kind: 'list',
        icon: 'boxes',
        label: "ProcessPoolExecutor",
        pattern: 'service',
        items: [
          "One Python per CPU, each with its own GIL",
          "pool.map sends work out and gathers results in order",
          "Starting processes and moving data costs time",
          "31 small files: the pool is slower",
          "8 heavy jobs: the pool is faster",
        ],
      },
      { id: 'speed-processes-note', kind: 'note', pattern: 'service', label: "The __main__ guard is required: each new process imports this file" },
    ],
  },
)
