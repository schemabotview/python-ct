import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { day, extractTree } from './tree'
import main from '../../../spine/extract/01-files/project/main.py?raw'
import session from '../../../spine/extract/01-files/session.txt?raw'

export const files: Scene = ideFrame(
  'extract-files',
  'roastery-etl',
  extractTree([day(1)]),
  { file: 'main.py', code: main, highlight: [5, 6, 8, 9], terminal: session },
  {
    id: 'extract-files-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'extract-files-facts',
        kind: 'list',
        icon: 'file',
        label: 'open() and with',
        pattern: 'storage',
        items: [
          'open() returns a file object: a stream of lines',
          'readline() reads one line, its \\n included',
          'for line in f reads one line at a time, never the whole file',
          'with closes the file on the way out, even after an error',
          'f.closed is True once the block ends',
        ],
      },
      { id: 'extract-files-note', kind: 'note', pattern: 'warn', label: 'Always pass encoding="utf-8": in Python 3.14 the default still depends on the machine' },
    ],
  },
)
