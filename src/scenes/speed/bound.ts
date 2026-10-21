import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { speedTree } from './tree'
import code from '../../../spine/speed/04-bound/project/bench/bound.py?raw'
import session from '../../../spine/speed/04-bound/session.txt?raw'

// Every number in this course's terminals is a timing or a memory peak: the step is volatile (replayed
// with digits masked), and the side panes and narration claim only what held on every run.
export const bound: Scene = ideFrame(
  'speed-bound',
  'roastery-etl',
  speedTree(4),
  { file: 'bench/bound.py', title: 'bench/bound.py', code, highlight: [7, 11, 16, 18], terminal: session },
  {
    id: 'speed-bound-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'which-bound',
        kind: 'table',
        label: "Which kind of slow?",
        headers: ["wall time is", "it is", "reach for"],
        values: [
          ["far above cpu", "I/O-bound", "threads, asyncio"],
          ["about cpu", "CPU-bound", "processes"],
        ],
      },
      {
        id: 'speed-bound-facts',
        kind: 'list',
        icon: 'clock',
        label: "Two clocks",
        pattern: 'service',
        items: [
          "perf_counter: time on the wall",
          "process_time: time this process spent on a CPU",
          "Waiting costs wall time and almost no CPU",
        ],
      },
    ],
  },
)
