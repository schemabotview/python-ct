import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { PROJECT, files } from './lab'
import code from '../../../spine/picture/03-zen/project/readable.py?raw'
import session from '../../../spine/picture/03-zen/session.txt?raw'

// §3 — the philosophy: readability, and batteries included. Both functions print 27.0 (the session);
// the standard-library modules are the ones this course's pipeline actually uses.
export const zen: SceneModel = ideFrame({
  project: PROJECT,
  tree: files(['readable.py'], 'readable.py'),
  editor: { file: 'readable.py', code, highlight: [4, 7, 8, 9, 10, 11, 12] },
  session,
  side: [
    {
      type: 'group', id: 'two-ways', title: 'The same rule, twice', icon: 'search', tone: 'ingest', children: [
        { type: 'item', id: 'clever', title: 'total_clever', sub: 'b, p and .9 on one line: the reader decodes it', icon: 'zap', tone: 'consume' },
        { type: 'item', id: 'readable', title: 'total_readable', sub: 'named values, a docstring, one step a line', icon: 'file', tone: 'store' },
        { type: 'item', id: 'same', title: 'Both print 27.0', sub: 'the same rule; only one is easy to check', icon: 'check' },
      ],
    },
    {
      type: 'table', id: 'batteries', title: 'Batteries included: what our pipeline imports', tone: 'store', columns: ['module', 'used for'], rows: [
        ['decimal', 'exact money'],
        ['csv', "the shop's daily order files"],
        ['json', 'the product catalogue'],
        ['pathlib', 'finding every day’s file'],
        ['sqlite3', 'the warehouse database'],
        ['datetime', 'daily and weekly totals'],
        ['logging', 'what happened, and when'],
      ],
    },
    { type: 'note', id: 'zen-note', tone: 'ingest', text: 'Readability counts: code is read far more often than it is written. Everything above ships with Python — nothing to install.' },
  ],
  edges: [{ from: 'clever', to: 'readable', label: 'rewritten' }],
})
