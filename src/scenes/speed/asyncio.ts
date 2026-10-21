import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { speedTree } from './tree'
import code from '../../../spine/speed/07-asyncio/project/bench/fetch.py?raw'
import session from '../../../spine/speed/07-asyncio/session.txt?raw'

// Every number in this course's terminals is a timing or a memory peak: the step is volatile (replayed
// with digits masked), and the side panes and narration claim only what held on every run.
export const asyncioScene: Scene = ideFrame(
  'speed-asyncio',
  'roastery-etl',
  speedTree(7),
  { file: 'bench/fetch.py', title: 'bench/fetch.py', code, show: [[9, 21], [24, 29]], highlight: [9, 10, 15, 19, 20], terminal: session },
  {
    id: 'speed-asyncio-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'async-words',
        kind: 'table',
        label: "asyncio, in four words",
        headers: ["word", "means"],
        values: [
          ["async def", "a coroutine: it can pause"],
          ["await", "pause here until it is done"],
          ["TaskGroup", "run tasks together"],
          ["asyncio.run", "start the event loop"],
        ],
      },
      {
        id: 'speed-asyncio-facts',
        kind: 'list',
        icon: 'globe',
        label: "One thread, many waits",
        pattern: 'service',
        items: [
          "While one fetch waits, the others start",
          "31 waits of 0.1 s overlap into one",
          "Best when the work is mostly waiting",
        ],
      },
    ],
  },
)
