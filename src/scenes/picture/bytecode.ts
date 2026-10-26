import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { PROJECT, files } from './lab'
import code from '../../../spine/picture/07-bytecode/project/pricing.py?raw'
import session from '../../../spine/picture/07-bytecode/session.txt?raw'

// §7 — source to bytecode: the tokens, the tree (BinOp / Name / Mult) and the four instructions
// look.py printed; pricing.cpython-315.pyc is the cache main.py's import wrote (shown in the explorer).
export const bytecode: SceneModel = ideFrame({
  project: PROJECT,
  tree: files(['look.py', 'main.py', 'pricing.py'], 'pricing.py', [
    { name: '__pycache__', state: 'new', children: [{ name: 'pricing.cpython-315.pyc', state: 'new' }] },
  ]),
  editor: { file: 'pricing.py', code, highlight: [2] },
  session,
  side: [
    {
      type: 'table', id: 'tokens', title: 'price * quantity, as tokens', tone: 'ingest', columns: ['type', 'text'], rows: [
        ['NAME', "'price'"], ['OP', "'*'"], ['NAME', "'quantity'"],
      ],
    },
    {
      type: 'group', id: 'ast', title: 'then parsed into a tree', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'binop', title: 'BinOp', sub: 'op = Mult()', icon: 'zap' },
        {
          type: 'group', id: 'operands', bare: true, dir: 'row', children: [
            { type: 'item', id: 'left', title: "Name 'price'", sub: 'left', icon: 'file' },
            { type: 'item', id: 'right', title: "Name 'quantity'", sub: 'right', icon: 'file' },
          ],
        },
      ],
    },
    {
      type: 'table', id: 'dis', title: 'line_total, compiled', tone: 'ingest', columns: ['instruction', 'does'], rows: [
        ['RESUME', 'starts the function'],
        ['LOAD_FAST_BORROW_LOAD_FAST_BORROW', 'pushes price, quantity'],
        ['BINARY_OP 5 (*)', 'multiplies the top two'],
        ['RETURN_VALUE', 'returns the top'],
      ],
    },
    {
      type: 'table', id: 'cache', title: '__pycache__/pricing.cpython-315.pyc', tone: 'store', columns: ['', ''], rows: [
        ['written when', 'pricing is first imported'],
        ['rebuilt when', 'pricing.py changes'],
        ['never for', 'the script you run: main.py'],
        ['cpython-315', 'one cache per Python version'],
      ],
    },
  ],
  edges: [{ from: 'binop', to: 'left' }, { from: 'binop', to: 'right' }],
})
