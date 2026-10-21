import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/how-python-runs/03-vm/project/line_total.py?raw'
import session from '../../../spine/how-python-runs/03-vm/session.txt?raw'

export const stackMachine: Scene = ideFrame(
  'stack-machine',
  'how-python-runs',
  [{ name: 'line_total.py', state: 'active' }],
  { file: 'line_total.py', code, highlight: [3], pattern: 'network', terminal: session },
  {
    id: 'stack-machine-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'trace',
        kind: 'table',
        label: 'The value stack, one instruction at a time',
        headers: ['', 'instruction', 'stack after'],
        values: [
          ['1', 'LOAD_NAME price', '9.5'],
          ['2', 'LOAD_NAME qty', '9.5  2'],
          ['3', 'BINARY_OP *', '19.0'],
          ['4', 'STORE_NAME total', '(empty)'],
        ],
      },
      {
        id: 'rules',
        kind: 'list',
        icon: 'layers',
        label: 'A stack machine',
        pattern: 'service',
        items: [
          'LOAD pushes a value onto the stack',
          'An operation pops its inputs and pushes its result',
          'STORE pops the top value and binds it to a name',
          'No registers: everything passes through the stack',
        ],
      },
    ],
  },
)
