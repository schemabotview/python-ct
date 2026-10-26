import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/process/05-while/project/main.py?raw'
import session from '../../../spine/process/05-while/session.txt?raw'

// §5 — while, break and continue. Skipped 1 (continue) and the first wholesale order ORD-1002 (break
// at i = 1) are the session's.
export const processWhile: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [lineOf(code, 'continue'), ...linesFrom(code, 'while i < len', 'i += 1')], show: [[1, 4], [lineOf(code, 'day_total, skipped'), lineOf(code, 'continue')], [lineOf(code, 'print("day total'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'table', id: 'trace', title: 'The while loop, step by step', tone: 'ingest', columns: ['i', 'line', 'wholesale?', 'then'], rows: [
        ['0', 'ORD-1001', 'no: 3 bags', 'i += 1'], { cells: ['1', 'ORD-1002', 'yes: 12 bags', 'print, break'], tone: 'store' },
      ],
    },
    {
      type: 'group', id: 'exits', title: 'Two ways out of a pass', icon: 'workflow', tone: 'ingest', dir: 'row', children: [
        { type: 'item', id: 'cont', title: 'continue', sub: 'skip to the next line: ORD-1005', icon: 'zap' },
        { type: 'item', id: 'brk', title: 'break', sub: 'leave the loop: found it', icon: 'zap', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'which', title: 'for or while?', tone: 'ingest', columns: ['loop', 'repeats', 'use it for'], rows: [
        ['for', 'once per item', 'a list, a file, a range'], ['while', 'while a test holds', 'when you control the step'],
      ],
    },
    { type: 'table', id: 'printed', title: 'main.py prints, after the four lines', tone: 'store', rows: [['day total: 277.20 | skipped: 1'], ['first wholesale order: ORD-1002']] },
    { type: 'item', id: 'w-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['continue skips; break leaves', 'a while loop must change its own test'] },
    {
      type: 'table', id: 'here', title: 'In this file', tone: 'ingest', columns: ['keyword', 'did'], rows: [
        ['continue', 'skipped ORD-1005, counted it'], ['while', 'walked the lines by index'], ['break', 'stopped at ORD-1002'],
      ],
    },
  ],
  edges: [{ from: 'cont', to: 'brk', label: 'or' }],
})
