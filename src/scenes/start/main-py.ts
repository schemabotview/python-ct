import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import main from '../../../spine/start/03-main/project/main.py?raw'
import session from '../../../spine/start/03-main/session.txt?raw'

export const firstMain: Scene = ideFrame(
  'first-main',
  'roastery-etl',
  [
    { name: '.venv', folder: true, state: 'muted', note: 'activated' },
    { name: 'main.py', state: 'new' },
  ],
  { file: 'main.py', code: main, highlight: [3, 4], terminal: session },
  {
    id: 'anatomy',
    kind: 'list',
    pills: true,
    icon: 'filecode',
    label: 'What is in the file',
    pattern: 'storage',
    items: [
      '# starts a comment — for people, ignored by Python',
      'print() is a function: it writes its arguments to the terminal',
      'Text goes in quotes; numbers do not',
      'Python runs the file top to bottom, one line at a time',
    ],
  },
)
