import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { loadTree } from './tree'
import main from '../../../spine/load/03-json/project/main.py?raw'
import session from '../../../spine/load/03-json/session.txt?raw'

export const jsonSummary: Scene = ideFrame(
  'load-json',
  'roastery-etl',
  loadTree({ out: [{ name: 'summary.json', state: 'new' }] }),
  { file: 'main.py', code: main, show: [[1, 1], [72, 89]], highlight: [74, 82, 83, 88], terminal: session },
  {
    id: 'load-json-facts',
    kind: 'list',
    icon: 'braces',
    label: 'json.dump for machines',
    sub: 'the same summary, for another program to read',
    pattern: 'storage',
    items: [
      'A Decimal is not a JSON type: dumps raises TypeError',
      'default=str writes it as exact text, "401430.14"',
      'Never default=float: that brings the rounding back',
      'Dates are already text here: "2026-10-01"',
      'indent=2 makes it readable by people too',
    ],
  },
)
