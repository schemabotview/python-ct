import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import syntax from '../../../spine/start/05-syntax-error/project/main.py?raw'
import syntaxRun from '../../../spine/start/05-syntax-error/session.txt?raw'
import name from '../../../spine/start/06-name-error/project/main.py?raw'
import nameRun from '../../../spine/start/06-name-error/session.txt?raw'

export const firstErrors: Scene = ideFrame(
  'first-errors',
  'roastery-etl',
  [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'main.py', state: 'active' },
  ],
  [
    { file: 'main.py', title: 'main.py — a bracket left open', code: syntax, highlight: [3], pattern: 'warn', terminal: syntaxRun },
    { file: 'main.py', title: 'main.py — a misspelt name', code: name, highlight: [4], pattern: 'warn', terminal: nameRun },
  ],
  {
    id: 'two-kinds',
    kind: 'table',
    label: 'Two kinds of error',
    headers: ['', 'SyntaxError', 'NameError'],
    values: [
      ['found by', 'the parser', 'the running program'],
      ['when', 'before any line runs', 'when line 4 is reached'],
      ['lines that ran', 'none', 'line 3 printed'],
      ['the fix', 'close the bracket', 'spell print correctly'],
    ],
  },
  { stack: true },
)
