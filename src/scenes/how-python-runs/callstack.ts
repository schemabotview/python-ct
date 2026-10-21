import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/how-python-runs/04-callstack/project/orders.py?raw'
import session from '../../../spine/how-python-runs/04-callstack/session.txt?raw'

export const callStack: Scene = ideFrame(
  'call-stack',
  'how-python-runs',
  [{ name: 'orders.py', state: 'active' }],
  { file: 'orders.py', code, highlight: [7], pattern: 'network', terminal: session },
  {
    id: 'stack',
    label: 'The call stack at line 7',
    sub: 'one frame per call, newest on top',
    pattern: 'group',
    icon: 'none',
    gap: 'tight',
    children: [
      { id: 'f-line', kind: 'list', icon: 'layers', label: 'line_total()', sub: 'top of the stack — running now', pattern: 'network', items: ["sku = 'ETH-250'", 'qty = 2'] },
      { id: 'f-order', kind: 'list', icon: 'layers', label: 'order_total()', sub: 'paused, waiting for line_total', pattern: 'service', items: ["order = {'ETH-250': 2}", 'total = 0', "sku = 'ETH-250'", 'qty = 2'] },
      { id: 'f-module', kind: 'list', icon: 'layers', label: '<module>', sub: 'the script itself — bottom of the stack', pattern: 'storage', items: ['PRICES = {...}', 'line_total = <function>', 'order_total = <function>'] },
    ],
  },
)
