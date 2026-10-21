import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { speedTree } from './tree'
import code from '../../../spine/speed/05-threads/project/bench/threads.py?raw'
import session from '../../../spine/speed/05-threads/session.txt?raw'

// Every number in this course's terminals is a timing or a memory peak: the step is volatile (replayed
// with digits masked), and the side panes and narration claim only what held on every run.
export const threads: Scene = ideFrame(
  'speed-threads',
  'roastery-etl',
  speedTree(5),
  { file: 'bench/threads.py', title: 'bench/threads.py', code, highlight: [10, 12, 14, 18, 20], terminal: session },
  {
    id: 'speed-threads-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'thread-results',
        kind: 'table',
        label: "Four jobs, four threads",
        headers: ["work", "python", "python3.14t"],
        values: [
          ["waiting", "overlaps", "overlaps"],
          ["computing", "no faster", "several × faster"],
        ],
      },
      {
        id: 'speed-threads-facts',
        kind: 'list',
        icon: 'cpu',
        label: "Threads and the GIL",
        pattern: 'service',
        items: [
          "Waiting threads release the GIL: they overlap",
          "Computing threads take turns on the default build",
          "The free-threaded build runs them on four cores",
        ],
      },
    ],
  },
)
