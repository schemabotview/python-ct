import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/10-exceptions/project/main.py?raw'
import session from '../../../spine/process/10-exceptions/session.txt?raw'

// §10 — exceptions: ORD-1006's BRA-500 is not in the catalogue; the KeyError leaves price_line and
// is caught in the loop, so the run finishes (the session).
export const processExceptions: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'try:', 'continue'), show: [[1, 4], [lineOf(code, 'ORD-1006'), lineOf(code, 'ORD-1006')], [lineOf(code, 'def price_line'), lineOf(code, 'return to_cents')], [lineOf(code, 'try:'), lineOf(code, 'print(line["id"], sku, quantity, total)')]] },
  session,
  side: [
    {
      type: 'group', id: 'unwind', title: 'A KeyError, travelling up', icon: 'layers', tone: 'consume', children: [
        { type: 'item', id: 'raise', title: 'catalogue["BRA-500"]', sub: 'raises KeyError in price_line', icon: 'bell', tone: 'consume' },
        { type: 'item', id: 'leave', title: 'price_line stops', sub: 'its frame is popped, no total', icon: 'layers' },
        { type: 'item', id: 'caught', title: 'except KeyError:', sub: 'in the loop: print, skip, continue', icon: 'check', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'out', title: 'The run finished', tone: 'ingest', columns: ['line', 'result'], rows: [
        ['ORD-1001 … ORD-1004', 'priced'], { cells: ['ORD-1006', 'skipped: unknown product BRA-500'], tone: 'consume' }, ['ORD-1007', 'priced: 17.50'], { cells: ['total', '294.70 | skipped: 2'], tone: 'store' },
      ],
    },
    { type: 'item', id: 'x-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['an uncaught error stops the program', 'catch it where you can decide what to do'] },
    {
      type: 'table', id: 'parts', title: 'try, except, continue', tone: 'ingest', columns: ['', ''], rows: [
        ['try:', 'run the call'], ['except KeyError:', 'if that error happens, run this instead'], ['continue', 'go on to the next line'],
      ],
    },
  ],
  edges: [{ from: 'raise', to: 'leave' }, { from: 'leave', to: 'caught' }],
})
