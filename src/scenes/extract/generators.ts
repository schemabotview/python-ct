import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { day, extractTree } from './tree'
import main from '../../../spine/extract/07-generators/project/main.py?raw'
import session from '../../../spine/extract/07-generators/session.txt?raw'

// tracemalloc's peaks change a little on every run (the step is volatile): read them from the transcript.
const lines = session.split('\n')
const peak = (prefix: string) => lines.find((l) => l.startsWith(prefix))!.match(/peak (\d+) KiB/)![1]

export const generators: Scene = ideFrame(
  'extract-generators',
  'roastery-etl',
  extractTree([day(1), day(2), { name: '… 28 more days', state: 'muted' }, { name: 'orders-2026-10-31.csv' }]),
  { file: 'main.py', code: main, highlight: [10, 13, 21, 26, 27, 30], show: [[1, 1], [10, 13], [20, 31]], terminal: session },
  {
    id: 'extract-generators-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'stream',
        label: 'One row in flight',
        sub: 'sum() pulls; read_rows() resumes, yields one row, pauses',
        pattern: 'network',
        icon: 'none',
        flow: 'LR',
        children: [
          { id: 'g-files', label: '31 files', variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 'g-gen', label: 'read_rows()', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'g-sum', label: 'sum()', variant: 'chip', pattern: 'service', icon: 'none' },
        ],
        edges: [
          { source: 'g-files', target: 'g-gen' },
          { source: 'g-gen', target: 'g-sum', label: 'yield' },
        ],
      },
      {
        id: 'peaks',
        kind: 'table',
        label: 'Peak memory, the same 5,876 rows',
        headers: ['', 'peak'],
        values: [
          ['streamed by a generator', `${peak('streamed')} KiB`],
          ['held in a list', `${peak('as a list')} KiB`],
        ],
      },
      {
        id: 'extract-generators-facts',
        kind: 'list',
        icon: 'waves',
        label: 'yield makes a generator',
        pattern: 'network',
        items: [
          'Calling read_rows() runs nothing yet',
          'next() runs it to the first yield, then pauses',
          'One open file and one row at a time, all month',
        ],
      },
    ],
  },
)
