import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/transform/05-dates/project/main.py?raw'
import session from '../../../spine/transform/05-dates/session.txt?raw'

// §5 — dates: daily and weekly totals with datetime. The busiest day, the weeks and isocalendar()
// are the session's; weeks 40 and 44 are partial (October 2026 starts on a Thursday).
export const transformDates: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days' }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'date = dt.date.fromisoformat', 'weekly[date.isocalendar'), show: [[1, 9], [lineOf(code, 'daily_bags, totals'), lineOf(code, 'daily, weekly')], [lineOf(code, 'totals.append'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'plot', id: 'weeks', tone: 'store', compact: true, title: 'October, week by week', x: { labels: ['wk 40', 'wk 41', 'wk 42', 'wk 43', 'wk 44'] }, y: { min: 0, max: 3500, step: 500 },
      series: [{ kind: 'bar', points: [[0, 700.80], [1, 3131.40], [2, 2807.93], [3, 2956.95], [4, 1981.80]] }],
    },
    {
      type: 'table', id: 'busy', title: 'The busiest day', tone: 'ingest', columns: ['', ''], rows: [
        ['busiest', 'Wednesday 07 October: 1106.81'], ['isocalendar()', 'year 2026, week 41, weekday 3'],
      ],
    },
    {
      type: 'table', id: 'how', title: 'From text to a date', tone: 'ingest', columns: ['', ''], rows: [
        ['dt.date.fromisoformat("2026-10-07")', 'a date'], ['.isocalendar().week', 'its ISO week: 41'], ['.strftime("%A %d %B")', 'Wednesday 07 October'],
      ],
    },
    { type: 'note', id: 'd-note', tone: 'ingest', text: 'Weeks 40 and 44 are short: October 2026 starts on a Thursday and ends on a Saturday. Compare whole weeks only.' },
  ],
  edges: [],
})
