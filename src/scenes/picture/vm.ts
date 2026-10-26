import type { SceneModel, Table } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { PROJECT, files } from './lab'
import code from '../../../spine/picture/08-vm/project/vm.py?raw'
import session from '../../../spine/picture/08-vm/session.txt?raw'

// §8 — the virtual machine: the value stack after each instruction dis printed, for
// line_total(10, 3, 2), which the session shows returning 28. Top of the stack first.
const stack = (id: string, title: string, cells: (string | number)[][], lit = false): Table =>
  ({ type: 'table', id, title, tone: lit ? 'store' : undefined, columns: ['value stack, top first'], rows: cells.map((c) => ({ cells: c })) })

export const vm: SceneModel = ideFrame({
  project: PROJECT,
  tree: files(['vm.py'], 'vm.py'),
  editor: { file: 'vm.py', code, highlight: [2] },
  session,
  side: [
    {
      type: 'group', id: 'machine', title: 'line_total(10, 3, 2), one instruction at a time', icon: 'cpu', tone: 'ingest', children: [
        stack('s1', 'LOAD_FAST_BORROW_LOAD_FAST_BORROW', [['3   quantity'], ['10  price']]),
        stack('s2', 'BINARY_OP 5 (*)', [['30']]),
        stack('s3', 'LOAD_FAST_BORROW 2 (discount)', [['2   discount'], ['30']]),
        stack('s4', 'BINARY_OP 10 (-)', [['28']]),
        { type: 'item', id: 'ret', title: 'RETURN_VALUE', sub: '28 goes back to the caller', icon: 'screen', tone: 'store' },
      ],
    },
    { type: 'note', id: 'vm-note', tone: 'ingest', text: 'A stack machine: each instruction takes its operands off the top of the stack and pushes its result back.' },
  ],
  edges: [{ from: 's1', to: 's2' }, { from: 's2', to: 's3' }, { from: 's3', to: 's4' }, { from: 's4', to: 'ret' }],
})
