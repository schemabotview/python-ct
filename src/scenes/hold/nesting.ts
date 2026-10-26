import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import { names, obj } from './mem'
import code from '../../../spine/hold/09-nesting/project/main.py?raw'
import session from '../../../spine/hold/09-nesting/session.txt?raw'

// §9 — nesting, aliasing and copying. Only the first order is drawn; the three quantities are the
// session's (4, 4, 3) after ORDERS[0]["quantity"] = 4.
export const holdNesting: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [19, 20], show: [[1, 6], [12, 24]] },
  session,
  side: [
    {
      type: 'group', id: 'shallow', title: 'copy.copy: a new list, the same dicts', icon: 'memory', tone: 'consume', dir: 'row', children: [
        names('sh-names', ['ORDERS', 'shallow']),
        { type: 'group', id: 'sh-lists', bare: true, children: [obj('sh-a', 'list', [{ id: 'r0', cells: ['[0] ●'] }]), obj('sh-b', 'list: new', [{ id: 'r0', cells: ['[0] ●'] }])] },
        obj('sh-dict', 'dict ORD-1001', [['quantity', 4]], 'consume'),
      ],
    },
    {
      type: 'group', id: 'deep', title: 'copy.deepcopy: new all the way down', icon: 'memory', tone: 'store', dir: 'row', children: [
        names('dp-names', ['ORDERS', 'deep']),
        { type: 'group', id: 'dp-lists', bare: true, children: [obj('dp-a', 'list', [{ id: 'r0', cells: ['[0] ●'] }]), obj('dp-b', 'list: new', [{ id: 'r0', cells: ['[0] ●'] }])] },
        { type: 'group', id: 'dp-dicts', bare: true, children: [obj('dp-d1', 'dict ORD-1001', [['quantity', 4]]), obj('dp-d2', 'dict: new', [['quantity', 3]], 'store')] },
      ],
    },
    {
      type: 'table', id: 'seen', title: 'After ORDERS[0]["quantity"] = 4', tone: 'ingest', columns: ['asked', 'sees'], rows: [
        { cells: ['DAYS["2026-10-01"][0]', '4: it is ORDERS'], tone: 'consume' },
        { cells: ['shallow[0]', '4: the same dict'], tone: 'consume' },
        { cells: ['deep[0]', '3: its own dict'], tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'path', title: 'DAYS: a dict of lists of dicts', tone: 'ingest', columns: ['expression', 'is'], rows: [
        ['DAYS', 'a dict'], { cells: ['DAYS["2026-10-01"]', 'ORDERS itself: the same list'], tone: 'consume' }, ['…[0]', 'a dict: the first order'], ['…[0]["quantity"]', 'its quantity'],
      ],
    },
    { type: 'item', id: 'nc-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['containers hold references', 'deepcopy when you need independence'] },
  ],
  edges: [
    { from: 'sh-names.ORDERS', to: 'sh-a' }, { from: 'sh-names.shallow', to: 'sh-b' },
    { from: 'sh-a.r0', to: 'sh-dict' }, { from: 'sh-b.r0', to: 'sh-dict' },
    { from: 'dp-names.ORDERS', to: 'dp-a' }, { from: 'dp-names.deep', to: 'dp-b' },
    { from: 'dp-a.r0', to: 'dp-d1' }, { from: 'dp-b.r0', to: 'dp-d2' },
  ],
})
