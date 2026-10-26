import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/transform/02-counter/project/main.py?raw'
import session from '../../../spine/transform/02-counter/session.txt?raw'

// §2 — Counter and defaultdict: the same grouping in less code, plus bags and customers. The
// numbers and most_common(3) are the session's.
export const transformCounter: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days' }),
  editor: { file: 'main.py', code, highlight: [lineOf(code, 'from collections import'), ...linesFrom(code, 'revenue[line["sku"]] +=', 'customers[line["customer"]]')], show: [[lineOf(code, 'from collections'), lineOf(code, 'from collections')], [lineOf(code, 'paths = sorted'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'touch', title: 'revenue["BRA-500"] += total, the first time', icon: 'memory', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'before', title: 'before ORD-1006', rows: [['ETH-250', '39.80'], ['COL-500', '178.50'], ['KEN-1000', '58.90']] },
        { type: 'table', id: 'after', title: 'after: made, then added', tone: 'store', rows: [['ETH-250', '39.80'], ['COL-500', '178.50'], ['KEN-1000', '58.90'], ['BRA-500', '0 + 32.50']] },
      ],
    },
    {
      type: 'table', id: 'month', title: 'October by product', tone: 'ingest', columns: ['sku', 'revenue', 'bags'], rows: [
        ['BRA-500', '1500.69', 101], ['COL-500', '3196.39', 203], ['ETH-250', '2420.90', 264], ['KEN-1000', '4460.90', 160],
      ],
    },
    { type: 'table', id: 'best', title: 'customers.most_common(3)', tone: 'store', rows: [["('maya', 23)"], ["('ana', 23)"], ["('lena', 22)"]] },
    { type: 'table', id: 'tools', title: 'A missing key starts at', tone: 'ingest', columns: ['', ''], rows: [['defaultdict(Decimal)', 'Decimal() = 0'], ['Counter()', '0, and it can count']] },
    { type: 'item', id: 'co-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['defaultdict: a missing key is made', 'Counter: counts, and most_common()'] },
  ],
  edges: [{ from: 'before', to: 'after', label: 'missing key' }],
})
