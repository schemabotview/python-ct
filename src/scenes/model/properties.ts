import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/03-properties/project/pipeline/model.py?raw'
import session from '../../../spine/model/03-properties/session.txt?raw'

// §3 — properties and an invariant: __post_init__ refuses a quantity below 1; subtotal and total are
// properties. The ValueError is the session's.
export const modelProperties: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/model.py' }),
  editor: { file: 'pipeline/model.py', code, highlight: [...linesFrom(code, 'def __post_init__', 'raise ValueError'), lineOf(code, 'def subtotal') - 1, lineOf(code, 'def total') - 1], show: [[lineOf(code, 'def __post_init__'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'Making a LineItem', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'call', title: 'LineItem(…, quantity)', sub: 'the generated __init__ sets the fields', icon: 'code' },
        { type: 'item', id: 'post', title: '__post_init__', sub: 'runs right after: checks the invariant', icon: 'lock' },
        {
          type: 'group', id: 'ends', bare: true, dir: 'row', children: [
            { type: 'item', id: 'ok', title: 'quantity ≥ 1', sub: 'a LineItem', icon: 'check', tone: 'store' },
            { type: 'item', id: 'bad', title: 'quantity 0', sub: 'ValueError: must be 1 or more', icon: 'bell', tone: 'consume' },
          ],
        },
      ],
    },
    { type: 'table', id: 'props', title: 'Properties: computed, read like attributes', tone: 'store', columns: ['read', 'computes'], rows: [['line.subtotal', 'price × quantity'], ['line.total', 'subtotal less its discount, to the cent']] },
    { type: 'table', id: 'worked', title: '4 bags of BRA-500, read as properties', tone: 'ingest', columns: ['property', 'value'], rows: [['line.subtotal', '4 × 16.25 = 65.00'], ['discount_rate', '5%: a line of 50.00 or more'], ['line.total', '61.75']] },
    { type: 'item', id: 'pr-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['an invariant is checked once, when the object is made', 'a property is computed each time it is read'] },
    { type: 'note', id: 'pr-note', tone: 'ingest', text: 'parse_row catches the ValueError and turns it into InvalidOrder: the rule lives in one place, the class.' },
  ],
  edges: [{ from: 'call', to: 'post' }, { from: 'post', to: 'ends' }],
})
