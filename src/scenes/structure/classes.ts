import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/04-classes/project/pipeline/models.py?raw'
import session from '../../../spine/structure/04-classes/session.txt?raw'

export const classes: Scene = ideFrame(
  'structure-classes',
  'roastery-etl',
  structureTree({ step: 4 }),
  { file: 'pipeline/models.py', title: 'pipeline/models.py', code, highlight: [4, 7, 8, 14], terminal: session },
  {
    id: 'structure-classes-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'structure-classes-facts',
        kind: 'list',
        icon: 'box',
        label: 'A class is a new type',
        pattern: 'user',
        items: [
          "Calling Order(...) runs __init__",
          "self is the object being built",
          "Attributes replace keys: order.sku, not order[\"sku\"]",
          "A method is a function that belongs to the type",
          "A typo in an attribute name fails loudly",
        ],
      },
    ],
  },
)
