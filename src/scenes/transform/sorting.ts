import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/transform/03-sorting/project/main.py?raw'
import session from '../../../spine/transform/03-sorting/session.txt?raw'

// §3 — sorting: top products by revenue (key=lambda item: item[1], reverse=True). The ranking and
// sorted(bags, key=bags.get) are the session's.
export const transformSorting: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days' }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'ranked = sorted', 'print(rank'), show: [[lineOf(code, 'paths = sorted'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'plot', id: 'chart', tone: 'store', compact: true, title: 'October revenue, top first', x: { labels: ['KEN-1000', 'COL-500', 'ETH-250', 'BRA-500'] }, y: { min: 0, max: 5000, step: 1000 },
      series: [{ kind: 'bar', points: [[0, 4460.90], [1, 3196.39], [2, 2420.90], [3, 1500.69]] }],
    },
    {
      type: 'table', id: 'key', title: 'sorted(revenue.items(), key=…, reverse=True)', tone: 'ingest', columns: ['part', 'does'], rows: [
        ['revenue.items()', '(sku, amount) pairs'], ['key=lambda item: item[1]', 'compare by the amount'], ['reverse=True', 'largest first'], ['enumerate(…, start=1)', 'number them 1, 2, 3'],
      ],
    },
    { type: 'table', id: 'asked', title: 'By bags instead, in the REPL', tone: 'store', rows: [['>>> sorted(bags, key=bags.get)'], ["['BRA-500', 'KEN-1000', 'COL-500', 'ETH-250']"]] },
    { type: 'note', id: 's-note', tone: 'ingest', text: 'Kenya sells few bags but earns the most: a 1 kg bag at 31.00. Rank by the question you are asking.' },
  ],
  edges: [],
})
