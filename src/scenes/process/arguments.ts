import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/08-arguments/project/main.py?raw'
import session from '../../../spine/process/08-arguments/session.txt?raw'

export const argumentsScene: Scene = ideFrame(
  'process-arguments',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [8, 13, 19, 21, 22], show: [[1, 1], [8, 22]], terminal: session },
  {
    id: 'process-arguments-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'process-arguments-model',
        label: 'The default list is made once',
        sub: 'when def runs, not when add_line is called',
        pattern: 'warn',
        icon: 'none',
        flow: 'LR',
        children: [
          { id: 'a-def', label: 'add_line.__defaults__', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'a-call1', label: 'call 1: lines', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'a-call2', label: 'call 2: lines', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'a-list', label: 'one list · 2 items', variant: 'chip', pattern: 'warn', icon: 'none' },
        ],
        edges: [
          { source: 'a-def', target: 'a-list' },
          { source: 'a-call1', target: 'a-list' },
          { source: 'a-call2', target: 'a-list' },
        ],
      },
      {
        id: 'arg-kinds',
        kind: 'table',
        label: 'Three ways to pass an argument',
        headers: ['kind', 'here'],
        values: [
          ['positional', 'line_total(price, 12, …)'],
          ['keyword', 'quantity=2, price=…'],
          ['default', 'discount left out: 0'],
        ],
      },
      { id: 'process-arguments-note', kind: 'note', pattern: 'storage', label: 'The fix: lines=None, then lines = [] inside the function' },
    ],
  },
)
