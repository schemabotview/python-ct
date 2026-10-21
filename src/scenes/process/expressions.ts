import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/01-expressions/project/main.py?raw'
import session from '../../../spine/process/01-expressions/session.txt?raw'

export const expressions: Scene = ideFrame(
  'process-expressions',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [15, 16, 17, 19, 20, 22], show: [[1, 6], [13, 23]], terminal: session },
  {
    id: 'process-expressions-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'precedence',
        kind: 'table',
        label: 'Precedence, tightest first',
        headers: ['operators', 'example'],
        values: [
          ['**', '2 ** 2'],
          ['-x (unary minus)', '-2'],
          ['*  /  //  %', 'price * quantity'],
          ['+  -', 'line_total + tax'],
          ['<  <=  ==  >=  in  is', '1 <= q <= 50'],
          ['not, then and, then or', 'q >= 10 or t > 50'],
        ],
      },
      {
        id: 'process-expressions-facts',
        kind: 'list',
        icon: 'sigma',
        label: 'An expression computes one value',
        pattern: 'network',
        items: [
          '2 + 3 * 4 is 14; brackets make it 20',
          '-2 ** 2 is -4: the power binds first',
          '1 <= q <= 50 chains two comparisons',
          'day_total += line_total adds in place',
        ],
      },
    ],
  },
)
