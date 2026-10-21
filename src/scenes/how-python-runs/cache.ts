import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import pricing from '../../../spine/how-python-runs/02-cache/project/pricing.py?raw'
import session from '../../../spine/how-python-runs/02-cache/session.txt?raw'

export const bytecodeCache: Scene = ideFrame(
  'bytecode-cache',
  'how-python-runs',
  [
    { name: '__pycache__', children: [{ name: 'pricing.cpython-314.pyc', state: 'new' }] },
    { name: 'main.py' },
    { name: 'pricing.py', state: 'active' },
  ],
  { file: 'pricing.py', code: pricing, highlight: [2], pattern: 'network', terminal: session },
  {
    id: 'rules',
    kind: 'list',
    icon: 'history',
    label: 'When Python compiles',
    sub: 'main.py imports pricing.py',
    pattern: 'service',
    items: [
      'An imported module is compiled once and cached',
      'It is recompiled when the .py changes: time stamp or size',
      'The script you run is compiled every time, never cached',
      'cpython-314 in the name: one cache per Python version',
      'Safe to delete, and never committed: Python rebuilds it',
    ],
  },
)
