import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import { names, obj } from './mem'
import code from '../../../spine/hold/05-lists/project/main.py?raw'
import session from '../../../spine/hold/05-lists/session.txt?raw'

// §5 — lists: the day's order lines. len 4 and sum 18 are main.py's output; append is the session's.
export const holdLists: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [7, 8, 9] },
  session,
  side: [
    {
      type: 'group', id: 'mem', title: 'Two lists, one slot per line', icon: 'memory', tone: 'ingest', dir: 'row', children: [
        names('l-names', ['skus', 'quantities']),
        { type: 'group', id: 'l-objs', bare: true, children: [
          obj('l-skus', 'list', [["0  'ETH-250'"], ["1  'COL-500'"], ["2  'KEN-1000'"], ["3  'ETH-250'"]]),
          obj('l-qty', 'list', [['0  3'], ['1  12'], ['2  2'], ['3  1']]),
        ] },
      ],
    },
    {
      type: 'table', id: 'ops', title: 'What a list can do', tone: 'ingest', columns: ['expression', 'gives'], rows: [
        ['len(skus)', '4'], ['sum(quantities)', '18'], ['skus[0]', "'ETH-250'"], ['skus.append("BRA-500")', 'one more, at the end'],
      ],
    },
    { type: 'note', id: 'l-note', tone: 'ingest', text: 'A list keeps its order and can change. Two lists side by side only agree by position; next, each line becomes one record.' },
    { type: 'item', id: 'l-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['positions start at 0', 'a list can grow and change'] },
  ],
  edges: [{ from: 'l-names.skus', to: 'l-skus' }, { from: 'l-names.quantities', to: 'l-qty' }],
})
