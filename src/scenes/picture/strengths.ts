import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { PROJECT, files } from './lab'
import code from '../../../spine/picture/04-timeit/project/sum_two_ways.py?raw'
import session from '../../../spine/picture/04-timeit/session.txt?raw'

// §4 — strengths and limits. The timings change every run (a volatile step), so the chart reads them
// from the same transcript the terminal shows; the narration claims only "about five times".
const ms = (label: string) => Number(session.match(new RegExp(`${label}\\s+([\\d.]+) ms`))![1])
const loop = ms('a Python loop:'), builtin = ms('sum\\(\\):')
const top = Math.ceil(loop / 10) * 10 + 10

export const strengths: SceneModel = ideFrame({
  project: PROJECT,
  tree: files(['sum_two_ways.py'], 'sum_two_ways.py'),
  editor: { file: 'sum_two_ways.py', code, highlight: [12, 13] },
  session,
  side: [
    {
      type: 'plot', id: 'timing', tone: 'ingest', compact: true, title: 'Adding a million numbers', x: { labels: ['a Python loop', 'sum()'] }, y: { min: 0, max: top, step: 10, label: 'ms' },
      series: [{ kind: 'bar', points: [[0, loop], [1, builtin]] }],
    },
    {
      type: 'table', id: 'fast-slow', title: 'What Python is fast and slow at', tone: 'ingest', columns: ['', 'Python is'], rows: [
        { cells: ['writing and reading the code', 'fast'], tone: 'store' },
        { cells: ['calling code written in C', 'fast'], tone: 'store' },
        { cells: ['waiting on files and networks', 'fine'], tone: 'store' },
        { cells: ['a tight loop in Python code', 'slow'], tone: 'consume' },
        { cells: ['CPU work on threads, default build', 'one at a time'], tone: 'consume' },
      ],
    },
    { type: 'note', id: 'why', tone: 'ingest', text: 'sum() runs in C; the loop runs in the virtual machine, one bytecode at a time. Course 11 measures before it speeds anything up.' },
  ],
})
