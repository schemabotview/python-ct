import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/09-scope/project/main.py?raw'
import session from '../../../spine/process/09-scope/session.txt?raw'

export const scope: Scene = ideFrame(
  'process-scope',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [3, 7, 10, 11, 18], terminal: session },
  {
    id: 'process-scope-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'legb',
        kind: 'table',
        label: 'Where Python looks for a name',
        headers: ['', 'scope', 'in this file'],
        values: [
          ['L', 'local', 'where, in inner()'],
          ['E', 'enclosing', 'TAX, in outer()'],
          ['G', 'global', 'TAX at the top; len'],
          ['B', 'builtin', 'len, print, sum'],
        ],
      },
      {
        id: 'process-scope-facts',
        kind: 'list',
        icon: 'search',
        label: 'The first match wins',
        pattern: 'network',
        items: [
          'inner() finds TAX in outer(), not the global',
          'len = 8 is a global that hides the builtin',
          'Assigning a name in a function makes it local',
        ],
      },
      {
        id: 'process-scope-note',
        kind: 'note',
        pattern: 'warn',
        label: "processed += 1 on a global: UnboundLocalError — cannot access local variable 'processed' where it is not associated with a value",
      },
    ],
  },
)
