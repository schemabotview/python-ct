import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { PROJECT, files } from './lab'
import code from '../../../spine/picture/11-refs/project/refs.py?raw'
import session from '../../../spine/picture/11-refs/session.txt?raw'

// §11 — reference counting and the cycle collector (CPython). The four numbers are the session's:
// getrefcount counts its own argument too, and gc.collect() finds the two dicts in the cycle.
const [r1, r2, r3, found] = session.split('\n').slice(1, 5)

export const refs: SceneModel = ideFrame({
  project: PROJECT,
  tree: files(['refs.py'], 'refs.py'),
  editor: { file: 'refs.py', code, highlight: [5, 7, 9, 15] },
  session,
  side: [
    {
      type: 'group', id: 'counted', title: 'After alias = order: two references', icon: 'memory', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'rc-names', title: 'names', rows: [['order', '●'], ['alias', '●']] },
        { type: 'table', id: 'rc-dict', title: 'dict', rows: [["'id'", "'ORD-1001'"]] },
      ],
    },
    {
      type: 'group', id: 'cycle', title: 'After del a, b: a cycle no name reaches', icon: 'memory', tone: 'consume', dir: 'row', children: [
        { type: 'table', id: 'cy-a', title: 'dict (was a)', rows: [["'other'", '●']] },
        { type: 'table', id: 'cy-b', title: 'dict (was b)', rows: [["'other'", '●']] },
      ],
    },
    {
      type: 'table', id: 'printed', title: 'What refs.py printed', tone: 'ingest', columns: ['line', 'prints', 'because'], rows: [
        ['5', r1, 'order, plus the call’s own argument'],
        ['7', r2, 'alias is one more'],
        ['9', r3, 'del alias removed it'],
        { cells: ['15', found, 'the two dicts in the cycle'], tone: 'consume' },
      ],
    },
    {
      type: 'table', id: 'freed', title: 'When CPython frees an object', tone: 'ingest', columns: ['', 'freed'], rows: [
        ['its count reaches 0', 'at once'],
        ['it is part of a cycle', 'when the garbage collector runs'],
        ['you call gc.collect()', 'now — rarely needed'],
      ],
    },
    { type: 'note', id: 'refs-note', tone: 'ingest', text: 'del removes a name, not an object. A cycle never reaches zero, so the collector looks for groups that nothing else can reach.' },
  ],
  edges: [
    { from: 'rc-names.order', to: 'rc-dict' },
    { from: 'rc-names.alias', to: 'rc-dict' },
    { from: 'cy-a', to: 'cy-b', label: 'each holds the other', bidirectional: true },
  ],
})
