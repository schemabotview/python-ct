import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/how-python-runs/09-traceback/project/broken.py?raw'
import session from '../../../spine/how-python-runs/09-traceback/session.txt?raw'

export const readingTraceback: Scene = ideFrame(
  'reading-traceback',
  'how-python-runs',
  [{ name: 'broken.py', state: 'active' }],
  { file: 'broken.py', code, highlight: [5, 11, 15], pattern: 'warn', terminal: session },
  {
    id: 'reading-traceback-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'read',
        kind: 'table',
        label: 'Read it from the bottom up',
        headers: ['', 'it says', 'which means'],
        values: [
          ['1st', "KeyError: 'KEN-250'", 'what went wrong'],
          ['2nd', 'line 5, line_total', 'where: newest frame'],
          ['3rd', 'line 11, order_total', 'who called it'],
          ['4th', 'line 15, <module>', 'where it started'],
        ],
      },
      { id: 'ranges', kind: 'note', pattern: 'service', label: 'A plain python run also marks the failing part of each line with ~~~^^^ — -X no_debug_ranges turns that off so the whole stack fits here' },
    ],
  },
)
