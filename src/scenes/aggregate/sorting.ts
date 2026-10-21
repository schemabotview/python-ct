import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { aggregateTree } from './tree'
import main from '../../../spine/aggregate/03-sorting/project/main.py?raw'
import session from '../../../spine/aggregate/03-sorting/session.txt?raw'

export const sorting: Scene = ideFrame(
  'aggregate-sorting',
  'roastery-etl',
  aggregateTree,
  { file: 'main.py', code: main, show: [[1, 1], [52, 65]], highlight: [59, 62, 65], terminal: session },
  {
    id: 'aggregate-sorting-facts',
    kind: 'list',
    icon: 'sortarrows',
    label: 'sorted(items, key=..., reverse=...)',
    sub: 'a new list, in the order you ask for',
    pattern: 'service',
    items: [
      'key is a function: what each item is compared by',
      'lambda item: item[1] sorts (sku, total) pairs by total',
      'key=by_customer.get sorts names by their totals',
      'reverse=True puts the largest first; [:3] keeps three',
      'Plain sorting puts capitals first; key=str.lower does not',
      'sorted() makes a new list; list.sort() changes one in place',
    ],
  },
)
