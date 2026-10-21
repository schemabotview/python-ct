import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/07-data-model/project/pipeline/models.py?raw'
import session from '../../../spine/structure/07-data-model/session.txt?raw'

export const dataModel: Scene = ideFrame(
  'structure-data-model',
  'roastery-etl',
  structureTree({ step: 7 }),
  { file: 'pipeline/models.py', title: 'pipeline/models.py', code, show: [[26, 45]], highlight: [34, 37, 40, 43], terminal: session },
  {
    id: 'structure-data-model-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'special-methods',
        kind: 'table',
        label: 'Special methods, and who calls them',
        headers: ["you write", "Python calls it for"],
        values: [
          ["__repr__", "the REPL, repr()"],
          ["__len__", "len(order)"],
          ["__iter__", "for item in order"],
          ["__eq__", "order == other (dataclass)"],
        ],
      },
      {
        id: 'structure-data-model-facts',
        kind: 'list',
        icon: 'layers',
        label: 'Objects that behave',
        pattern: 'user',
        items: [
          "Order holds a list of LineItems",
          "sum() iterates it like any list",
          "LineItem is section 6’s, folded above",
        ],
      },
    ],
  },
)
