import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { project } from '../start/tree'
import code from '../../../spine/hold/04-none/project/main.py?raw'
import session from '../../../spine/hold/04-none/session.txt?raw'

// §4 — booleans, None and sentinels. bool(None) False and bool(NOT_GIVEN) True are the session's;
// a 3.15 sentinel is a unique named object, truthy, never equal to None.
export const holdNone: SceneModel = ideFrame({
  tree: project('active'),
  editor: { file: 'main.py', code, highlight: [16, 17, 18] },
  session,
  side: [
    {
      type: 'group', id: 'bool', title: 'A comparison makes a bool', icon: 'check', tone: 'ingest', dir: 'row', children: [
        { type: 'item', id: 'cmp', title: 'quantity >= 10', sub: '3 >= 10', icon: 'search' },
        { type: 'item', id: 'res', title: 'False', sub: 'a bool', icon: 'boxes' },
        { type: 'item', id: 'kept', title: 'is_wholesale', sub: 'the name keeps it', icon: 'file' },
      ],
    },
    {
      type: 'table', id: 'states', title: 'A discount code has three states', tone: 'ingest', columns: ['value', 'means', 'is None', 'bool'], rows: [
        ['"WELCOME10"', 'a code was entered', 'False', 'True'],
        { cells: ['None', 'the customer had no code', 'True', 'False'], tone: 'store' },
        { cells: ['NOT_GIVEN', 'nobody told us', 'False', 'True'], tone: 'serve' },
      ],
    },
    {
      type: 'table', id: 'sentinel', title: 'NOT_GIVEN = sentinel("NOT_GIVEN") — new in 3.15', tone: 'serve', columns: ['', ''], rows: [
        ['it is', 'one unique object, with a name'],
        ['check it with', 'value is NOT_GIVEN'],
        ['use it when', 'None already means something'],
      ],
    },
    { type: 'note', id: 'none-note', tone: 'ingest', text: 'Test for None with is None, not with truthiness: an empty string and 0 are falsy too.' },
    {
      type: 'table', id: 'answered', title: 'Asked in the REPL', tone: 'ingest', columns: ['typed', 'Python answers'], rows: [
        ['NOT_GIVEN is None', 'False'], ['bool(None), bool(NOT_GIVEN)', '(False, True)'],
      ],
    },
    { type: 'item', id: 'n-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['compare with is None', 'a sentinel when None means something'] },
  ],
  edges: [{ from: 'cmp', to: 'res' }, { from: 'res', to: 'kept' }],
})
