import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/11-raising/project/main.py?raw'
import session from '../../../spine/process/11-raising/session.txt?raw'

// §11 — raising your own: price_line validates and raises InvalidOrder with a reason; the loop
// collects them. The rejected lines are the session's.
export const processRaising: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [...linesFrom(code, 'class InvalidOrder', '"""A line'), lineOf(code, 'raise InvalidOrder(f"{line'), lineOf(code, 'unknown product')], show: [[lineOf(code, 'class InvalidOrder'), lineOf(code, '"""A line')], [lineOf(code, 'def price_line'), lineOf(code, 'unknown product')], [lineOf(code, 'for line in lines'), lineOf(code, 'continue')]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'Every line, one of two ways', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'in', title: 'price_line(line)', sub: 'checks the quantity and the product', icon: 'shield' },
        { type: 'group', id: 'outs', bare: true, dir: 'row', children: [
          { type: 'item', id: 'ok', title: 'returns a total', sub: '5 lines: 294.70', icon: 'check', tone: 'store' },
          { type: 'item', id: 'bad', title: 'raises InvalidOrder', sub: 'with the reason', icon: 'bell', tone: 'consume' },
        ] },
      ],
    },
    {
      type: 'table', id: 'rejected', title: 'rejected — printed at the end', tone: 'consume', rows: [["ORD-1005: quantity 'three'"], ['ORD-1006: unknown product BRA-500']],
    },
    {
      type: 'table', id: 'why', title: 'Why a class of our own', tone: 'ingest', columns: ['', ''], rows: [
        ['class InvalidOrder(Exception)', 'a kind of error the pipeline owns'], ['except InvalidOrder', 'catches ours, nothing else'], ['the message', 'which line, and why'],
      ],
    },
    { type: 'item', id: 'r-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a clear error beats a wrong answer', 'never stop silently: report every line'] },
    { type: 'table', id: 'printed', title: 'main.py prints, after the five lines', tone: 'store', rows: [['total: 294.70 | rejected: 2']] },
    { type: 'note', id: 'narrow', tone: 'ingest', text: 'except InvalidOrder will not hide a typo: a NameError in our own code still stops the run, as it should.' },
  ],
  edges: [{ from: 'in', to: 'ok' }, { from: 'in', to: 'bad' }],
})
