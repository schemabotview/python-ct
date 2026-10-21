import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import main from '../../../spine/start/05-syntax-error/project/main.py?raw'
import session from '../../../spine/start/05-syntax-error/session.txt?raw'

export const syntaxError: Scene = ideFrame(
  'syntax-error',
  'roastery-etl',
  [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'main.py', state: 'active' },
  ],
  { file: 'main.py', title: 'main.py — a bracket left open', code: main, highlight: [3], pattern: 'warn', terminal: session },
  {
    id: 'syntax-facts',
    kind: 'list',
    icon: 'ban',
    label: 'A SyntaxError',
    sub: 'the file is not valid Python',
    pattern: 'warn',
    items: [
      'Found by the parser, before any line runs',
      'So nothing is printed — not even line 3',
      'It names the line, and the caret marks the place',
      'The last line says what is wrong, in plain words',
      'The fix: close the bracket',
    ],
  },
)
