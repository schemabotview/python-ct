import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import main from '../../../spine/start/04-repl/project/main.py?raw'
import session from '../../../spine/start/04-repl/session.txt?raw'

export const replBeside: Scene = ideFrame(
  'repl-beside',
  'roastery-etl',
  [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'main.py', state: 'active' },
  ],
  [{ file: 'main.py', code: main, terminal: session }],
  {
    id: 'repl-vs-script',
    kind: 'table',
    label: 'The REPL and a script',
    headers: ['', 'REPL', 'script'],
    values: [
      ['how', 'python, then type', 'python main.py'],
      ['shows values', 'yes, automatically', 'only with print()'],
      ['kept', 'gone when you exit', 'saved in the file'],
      ['use it to', 'try one line', 'build the program'],
    ],
  },
  { sideBelow: true },
)
