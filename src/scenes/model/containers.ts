import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/05-containers/project/pipeline/validate.py?raw'
import session from '../../../spine/model/05-containers/session.txt?raw'

// §5 — a container and an alternate constructor: Orders.from_rows, __len__, __iter__, __contains__.
// The answers are the session's.
export const modelContainers: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/validate.py' }),
  editor: { file: 'pipeline/validate.py', code, highlight: [lineOf(code, '@classmethod'), ...linesFrom(code, 'def __len__', 'return any(')], show: [[lineOf(code, '@classmethod'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'build', title: 'Rows in, an Orders out', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'rows', title: 'iter_rows(paths)', sub: 'every CSV row of the month', icon: 'file' },
        { type: 'item', id: 'from', title: 'Orders.from_rows(rows)', sub: 'a classmethod: cls(lines, rejected)', icon: 'code' },
        { type: 'item', id: 'orders', title: 'orders', sub: '163 lines, 13 rejected', icon: 'boxes', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'protocol', title: 'Python syntax, our methods', tone: 'ingest', columns: ['you write', 'Python calls', 'answer'], rows: [
        ['len(orders)', '__len__', '163'], ['"ORD-1001" in orders', '__contains__', 'True'], { cells: ['"ORD-1013" in orders', '__contains__', 'False: rejected'], tone: 'consume' }, ['for line in orders', '__iter__', 'each LineItem'],
      ],
    },
    { type: 'table', id: 'inside', title: 'orders, inside', tone: 'store', columns: ['attribute', 'holds'], rows: [['orders.lines', '163 LineItem objects'], ['orders.rejected', '13 InvalidOrder errors, with reasons']] },
    { type: 'item', id: 'co-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['special methods make a class work with len, in and for', 'a classmethod is a second way to build one'] },
  ],
  edges: [{ from: 'rows', to: 'from' }, { from: 'from', to: 'orders' }],
})
