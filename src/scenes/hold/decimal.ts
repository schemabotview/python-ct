import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/hold/02-decimal/project/main.py?raw'
import session from '../../../spine/hold/02-decimal/session.txt?raw'

// §2 — numbers, and why money is a Decimal. Every answer is the REPL session's.
export const holdDecimal: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [3, 8] },
  session,
  side: [
    {
      type: 'table', id: 'typed', title: 'Typed at >>>', tone: 'ingest', columns: ['typed', 'Python answers'], rows: [
        { cells: ['0.1 + 0.2', '0.30000000000000004'], tone: 'consume' },
        { cells: ['Decimal("0.1") + Decimal("0.2")', "Decimal('0.3')"], tone: 'store' },
        { cells: ['Decimal(9.95)', "Decimal('9.9499999999…')"], tone: 'consume' },
      ],
    },
    {
      type: 'group', id: 'make', title: 'Make a Decimal from text, never from a float', icon: 'card', tone: 'store', children: [
        { type: 'group', id: 'from-text', bare: true, dir: 'row', children: [
          { type: 'item', id: 'text', title: 'the text "9.95"', sub: 'exactly what the shop wrote', icon: 'file' },
          { type: 'item', id: 'dec-ok', title: 'Decimal("9.95")', sub: 'exactly 9.95', icon: 'check', tone: 'store' },
        ] },
        { type: 'group', id: 'from-float', bare: true, dir: 'row', children: [
          { type: 'item', id: 'flt', title: 'the float 9.95', sub: 'already the nearest binary value', icon: 'cpu' },
          { type: 'item', id: 'dec-bad', title: 'Decimal(9.95)', sub: 'that error, kept exactly', icon: 'bell', tone: 'consume' },
        ] },
      ],
    },
    {
      type: 'table', id: 'kinds', title: 'Three kinds of number', tone: 'ingest', columns: ['type', 'holds', 'we use it for'], rows: [
        ['int', 'whole numbers, exactly', 'quantities'],
        ['float', 'the nearest binary fraction', 'measurements'],
        ['Decimal', 'decimal digits, exactly', 'money'],
      ],
    },
    { type: 'table', id: 'printed', title: 'main.py now prints', tone: 'store', rows: [['line: ETH-250 3 29.85']] },
    { type: 'item', id: 'd-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['Decimal("9.95"), with the quotes', 'int for counts, Decimal for money'] },
  ],
  edges: [
    { from: 'text', to: 'dec-ok', label: 'parsed' },
    { from: 'flt', to: 'dec-bad', label: 'copied' },
  ],
})
