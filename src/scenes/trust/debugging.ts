import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { trustTree } from './tree'
import code from '../../../spine/trust/06-debugging/project/debug.py?raw'
import session from '../../../spine/trust/06-debugging/session.txt?raw'

export const debugging: Scene = ideFrame(
  'trust-debugging',
  'roastery-etl',
  trustTree(6),
  { file: 'debug.py', title: 'debug.py', code, highlight: [5], terminal: session },
  {
    id: 'trust-debugging-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'pdb-commands',
        kind: 'table',
        label: "pdb, the debugger",
        headers: ["type", "to"],
        values: [
          ["p expr", "print any expression"],
          ["n", "run the next line"],
          ["s", "step into a call"],
          ["l", "list the code around here"],
          ["w", "show the call stack"],
          ["c", "continue running"],
          ["q", "quit the program"],
        ],
      },
      { id: 'trust-debugging-note', kind: 'note', pattern: 'network', label: "breakpoint() pauses right there; any Python typed at (Pdb) runs in the paused program" },
    ],
  },
)
