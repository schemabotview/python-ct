import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { speedTree } from './tree'
import code from '../../../spine/speed/03-memory/project/bench/memory.py?raw'
import session from '../../../spine/speed/03-memory/session.txt?raw'

// Every number in this course's terminals is a timing or a memory peak: the step is volatile (replayed
// with digits masked), and the side panes and narration claim only what held on every run.
export const memory: Scene = ideFrame(
  'speed-memory',
  'roastery-etl',
  speedTree(3),
  { file: 'bench/memory.py', title: 'bench/memory.py', code, highlight: [9, 10, 12, 17, 18], terminal: session },
  {
    id: 'speed-memory-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'speed-memory-facts',
        kind: 'list',
        icon: 'memory',
        label: "Streaming keeps memory flat",
        pattern: 'service',
        items: [
          "list() holds the whole month at once",
          "A generator holds one row at a time",
          "The summaries are identical either way",
          "A year streamed needs no more memory than a month",
        ],
      },
      { id: 'speed-memory-note', kind: 'note', pattern: 'service', label: "main.py still keeps the month in a list: the database load needs every row. At a year’s scale, load day by day too" },
    ],
  },
)
