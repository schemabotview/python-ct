import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/08-type-hints/project/pipeline/transform.py?raw'
import session from '../../../spine/structure/08-type-hints/session.txt?raw'

export const typeHints: Scene = ideFrame(
  'structure-type-hints',
  'roastery-etl',
  structureTree({ step: 8 }),
  { file: 'pipeline/transform.py', title: 'pipeline/transform.py', code, show: [[1, 11], [14, 14], [26, 26], [31, 31], [43, 45]], highlight: [10, 11, 14, 26, 31, 43], terminal: session },
  {
    id: 'structure-type-hints-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'structure-type-hints-facts',
        kind: 'list',
        icon: 'shieldcheck',
        label: 'Hints are contracts',
        pattern: 'user',
        items: [
          "price: Decimal, quantity: int -> Decimal",
          "Python does not check them when it runs",
          "mypy reads them and checks every call",
          "check.py’s \"3\" is caught without running it",
          "type Row = ... names a type (3.12+)",
        ],
      },
      { id: 'structure-type-hints-note', kind: 'note', pattern: 'user', label: 'mypy also found two real slips in this course\u2019s own code: both fixed here' },
    ],
  },
)
