import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { dataTree, DAYS_1_3 } from '../extract/tree'
import code from '../../../spine/transform/07-summarise/project/main.py?raw'
import session from '../../../spine/transform/07-summarise/session.txt?raw'

// §7 — the transform step: summarise() takes priced lines and returns everything the report needs.
// The report and sorted(summary) are the session's.
export const transformSummarise: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { more: '… 28 more days' }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def summarise', 'return {'), show: [[lineOf(code, 'def summarise'), lineOf(code, '"median": statistics')]] },
  session,
  side: [
    {
      type: 'group', id: 'box', title: 'summarise(lines) → summary', icon: 'workflow', tone: 'ingest', dir: 'row', children: [
        { type: 'item', id: 'in', title: 'priced lines', sub: 'a generator: read once', icon: 'file' },
        { type: 'table', id: 'out', title: 'summary: a dict', tone: 'store', rows: [['bags'], ['customers'], ['daily'], ['mean'], ['median'], ['revenue'], ['total'], ['weekly']] },
      ],
    },
    {
      type: 'table', id: 'report', title: 'What main.py prints from it', tone: 'ingest', rows: [
        ['October: 11578.88 | rejected: 13'], ['top product: KEN-1000 4460.90'], ["best customer: ('maya', 23)"], ['mean line: 71.04 | median: 49.75'],
      ],
    },
    { type: 'item', id: 'su-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['transform: lines in, a summary out', 'it reads no file and prints nothing'] },
    { type: 'note', id: 'su-note', tone: 'ingest', text: 'Because summarise touches nothing outside its argument, Course 10 can test it with three made-up lines.' },
    {
      type: 'table', id: 'pure', title: 'What summarise does not do', tone: 'store', columns: ['', ''], rows: [['read a file', 'no'], ['print', 'no'], ['change its input', 'no']],
    },
  ],
  edges: [{ from: 'in', to: 'out', label: 'one pass' }],
})
