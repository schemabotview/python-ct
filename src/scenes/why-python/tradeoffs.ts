import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/why-python/04-tradeoffs/project/sum_two_ways.py?raw'
import session from '../../../spine/why-python/04-tradeoffs/session.txt?raw'

// The timings are a real run and change every time (the step is volatile); the narration claims only
// the gap, never the exact numbers.
export const tradeoffs: Scene = ideFrame(
  'python-tradeoffs',
  'why-python',
  [{ name: 'sum_two_ways.py', state: 'active' }],
  { file: 'sum_two_ways.py', code, highlight: [8, 9, 14, 15], pattern: 'network', terminal: session },
  {
    id: 'python-tradeoffs-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'fit',
        kind: 'table',
        label: 'Where Python fits',
        headers: ['job', 'Python'],
        values: [
          ['automation and glue', 'strong'],
          ['data analysis and ML', 'strong'],
          ['data pipelines', 'strong'],
          ['web back ends', 'good'],
          ['tight pure-Python loops', 'slow'],
          ['mobile apps', 'weak'],
          ['in the browser', 'not native'],
        ],
      },
      {
        id: 'lesson',
        kind: 'list',
        icon: 'zap',
        label: 'Fast where it counts',
        pattern: 'service',
        items: [
          'The loop runs one bytecode instruction at a time',
          'sum() does the same work in compiled C',
          'Fast Python code hands its inner loops to C',
        ],
      },
    ],
  },
)
