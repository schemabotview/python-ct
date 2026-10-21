import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import main from '../../../spine/start/06-name-error/project/main.py?raw'
import session from '../../../spine/start/06-name-error/session.txt?raw'

export const nameError: Scene = ideFrame(
  'name-error',
  'roastery-etl',
  [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'main.py', state: 'active' },
  ],
  { file: 'main.py', title: 'main.py — a misspelt name', code: main, highlight: [4], pattern: 'warn', terminal: session },
  {
    id: 'two-kinds',
    kind: 'table',
    label: 'Two kinds of error',
    headers: ['', 'SyntaxError', 'NameError'],
    values: [
      ['found by', 'the parser', 'the run'],
      ['when', 'before running', 'at line 4'],
      ['lines run', 'none', 'line 3'],
      ['fix', 'close the (', 'spell print'],
    ],
  },
)
