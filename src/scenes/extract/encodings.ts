import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { day, extractTree } from './tree'
import main from '../../../spine/extract/02-encodings/project/main.py?raw'
import session from '../../../spine/extract/02-encodings/session.txt?raw'

export const encodings: Scene = ideFrame(
  'extract-encodings',
  'roastery-etl',
  extractTree([day(1), day(2, { state: "new" })]),
  { file: 'main.py', code: main, highlight: [5, 10, 14, 17, 18], terminal: session },
  {
    id: 'extract-encodings-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'two-encodings',
        kind: 'table',
        label: 'The same letters, two encodings',
        headers: ['letter', 'cp1252 bytes', 'UTF-8 bytes'],
        values: [
          ['é', 'e9', 'c3 a9'],
          ['ë', 'eb', 'c3 ab'],
          ['E', '45', '45'],
        ],
      },
      {
        id: 'extract-encodings-facts',
        kind: 'list',
        icon: 'hash',
        label: 'bytes on disk, str in Python',
        pattern: 'network',
        items: [
          '"rb" reads raw bytes: what is really in the file',
          'decode() turns bytes into str, by a named encoding',
          'A wrong guess may fail, or may silently garble',
          'Convert once, at the boundary: inside, all is UTF-8',
        ],
      },
    ],
  },
)
