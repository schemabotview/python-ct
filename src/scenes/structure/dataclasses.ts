import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/05-dataclasses/project/pipeline/models.py?raw'
import session from '../../../spine/structure/05-dataclasses/session.txt?raw'

export const dataclassesScene: Scene = ideFrame(
  'structure-dataclasses',
  'roastery-etl',
  structureTree({ step: 5 }),
  { file: 'pipeline/models.py', title: 'pipeline/models.py', code, highlight: [6, 10, 11, 12, 13, 14], terminal: session },
  {
    id: 'structure-dataclasses-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'dataclass-writes',
        kind: 'table',
        label: 'What @dataclass writes for you',
        headers: ["method", "from"],
        values: [
          ["__init__", "the fields, in order"],
          ["__repr__", "Order(id=..., ...)"],
          ["__eq__", "equal fields, equal orders"],
        ],
      },
      {
        id: 'structure-dataclasses-facts',
        kind: 'list',
        icon: 'scissors',
        label: 'Less code, same object',
        pattern: 'user',
        items: [
          "The annotations name the fields",
          "is_wholesale() is unchanged",
          "Section 8 explains the annotations",
        ],
      },
    ],
  },
)
