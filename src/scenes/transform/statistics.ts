import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/transform/04-statistics/project/main.py?raw'
import session from '../../../spine/transform/04-statistics/session.txt?raw'

// §4 — math and statistics: mean, median and the largest line, and a roasting decision rounded UP.
// Every number is the session's, including Python's round-half-to-even.
export const transformStatistics: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days' }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'print("lines:"', 'print("bags a day:"'), show: [[lineOf(code, 'import math'), lineOf(code, 'import statistics')], [lineOf(code, 'total = price_line(line)'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'plot', id: 'spread', tone: 'ingest', compact: true, title: 'One October order line', x: { labels: ['median', 'mean', 'largest'] }, y: { min: 0, max: 350, step: 50 },
      series: [{ kind: 'bar', points: [[0, 49.75], [1, 71.04], [2, 316.20]] }],
    },
    {
      type: 'table', id: 'round', title: 'Rounding, in the REPL', tone: 'ingest', columns: ['typed', 'answer', 'because'], rows: [
        ['math.ceil(2.1)', '3', 'always up'], ['math.floor(2.9)', '2', 'always down'], { cells: ['round(2.5), round(3.5)', '2, 4', 'halves go to even'], tone: 'consume' },
      ],
    },
    {
      type: 'table', id: 'roast', title: 'How many bags to roast a day?', tone: 'store', columns: ['', ''], rows: [['average sold', '23.48… bags'], ['math.ceil', '24: never run short']],
    },
    { type: 'note', id: 'st-note', tone: 'ingest', text: 'The mean is above the median: a few large wholesale lines pull it up. Report both, and round money only at the end.' },
  ],
  edges: [],
})
