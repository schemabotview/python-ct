import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import { obj } from './mem'
import code from '../../../spine/hold/08-sets/project/main.py?raw'
import session from '../../../spine/hold/08-sets/session.txt?raw'

// §8 — sets and frozendict: duplicates collapse (len 3, the session's) and the frozen catalogue
// refuses a write (the session's TypeError).
export const holdSets: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [7, 8, 9, 10, 11] },
  session,
  side: [
    {
      type: 'group', id: 'dedupe', title: 'A set keeps each value once', icon: 'boxes', tone: 'ingest', dir: 'row', children: [
        obj('s-list', 'four names', [["'maya'"], ["'omar'"], ["'lena'"], ["'maya'"]]),
        obj('s-set', 'set: len 3', [["'maya'"], ["'omar'"], ["'lena'"]], 'store'),
      ],
    },
    {
      type: 'table', id: 'membership', title: 'x in …', tone: 'ingest', columns: ['in a', 'Python', 'cost'], rows: [
        ['list', 'checks every item in turn', 'grows with the list'],
        { cells: ['set', 'hashes x, looks in one place', 'one step'], tone: 'store' },
        ['dict', 'the same, by key', 'one step'],
      ],
    },
    {
      type: 'table', id: 'frozen', title: 'CATALOGUE is a frozendict, new in 3.15', tone: 'consume', columns: ['typed', 'Python answers'], rows: [
        ['CATALOGUE["ETH-250"] = Decimal("0")', 'TypeError'],
      ],
    },
    { type: 'note', id: 'f-note', tone: 'ingest', text: 'Prices must not change while the pipeline runs. A frozendict reads like a dict, and refuses every write.' },
    {
      type: 'table', id: 'recap', title: 'Every collection so far', tone: 'store', columns: ['', 'ordered', 'changes', 'duplicates'], rows: [
        ['list', 'yes', 'yes', 'yes'], ['tuple', 'yes', 'no', 'yes'], ['dict', 'by insertion', 'yes', 'keys: no'], ['set', 'no', 'yes', 'no'], ['frozendict', 'by insertion', 'no', 'keys: no'],
      ],
    },
  ],
  edges: [{ from: 's-list', to: 's-set', label: 'set()' }],
})
