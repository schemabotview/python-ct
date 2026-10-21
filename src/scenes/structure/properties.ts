import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/06-properties/project/pipeline/models.py?raw'
import session from '../../../spine/structure/06-properties/session.txt?raw'

export const properties: Scene = ideFrame(
  'structure-properties',
  'roastery-etl',
  structureTree({ step: 6 }),
  { file: 'pipeline/models.py', title: 'pipeline/models.py', code, show: [[9, 23], [26, 28]], highlight: [9, 17, 19, 21, 22], terminal: session },
  {
    id: 'structure-properties-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'structure-properties-facts',
        kind: 'list',
        icon: 'lock',
        label: 'A LineItem that cannot be wrong',
        pattern: 'user',
        items: [
          "__post_init__ checks every new LineItem",
          "A quantity below 1 is refused at birth",
          "frozen=True: no field can change afterwards",
          "@property: item.total, computed, no brackets",
          "The total reuses transform.line_total",
        ],
      },
    ],
  },
)
