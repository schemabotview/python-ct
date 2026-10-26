import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/09-context-managers/project/pipeline/load.py?raw'
import session from '../../../spine/model/09-context-managers/session.txt?raw'

// §9 — a context manager: SqliteWarehouse commits when the block finishes and rolls back when it
// raises. The (0, None) inside the block and the 163 rows after are the session's.
export const modelContextManagers: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'pipeline/errors.py', 'pipeline/ports.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/load.py' }),
  editor: { file: 'pipeline/load.py', code, highlight: [...linesFrom(code, 'def __enter__', 'return self'), ...linesFrom(code, 'if kind is None', 'self.conn.close()')], show: [[lineOf(code, 'def __enter__'), lineOf(code, 'self.conn.close()')]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'with SqliteWarehouse(path) as warehouse:', icon: 'database', tone: 'ingest', children: [
        { type: 'item', id: 'enter', title: '__enter__', sub: 'make data/out, connect, CREATE TABLE', icon: 'lock' },
        { type: 'item', id: 'body', title: 'the block', sub: 'warehouse.write(result): 163 upserts', icon: 'code' },
        {
          type: 'group', id: 'ends', bare: true, dir: 'row', children: [
            { type: 'item', id: 'ok', title: 'block finished', sub: '__exit__: commit, close', icon: 'check', tone: 'store' },
            { type: 'item', id: 'bad', title: 'block raised', sub: '__exit__: roll back, close', icon: 'bell', tone: 'consume' },
          ],
        },
      ],
    },
    {
      type: 'table', id: 'proof', title: 'A crash, on purpose', tone: 'store', columns: ['moment', 'order_lines'], rows: [
        ['inside: DELETE, then w.totals()', '(0, None)'], { cells: ['raise RuntimeError', 'rolled back'], tone: 'consume' }, ['after: SELECT COUNT(*)', '(163,)'],
      ],
    },
    { type: 'table', id: 'calls', title: 'What a with statement calls', tone: 'ingest', columns: ['when', 'Python calls'], rows: [['with W() as w:', 'w = W().__enter__()'], ['the block finishes', '__exit__(None, None, None)'], ['the block raises', '__exit__(kind, error, traceback)']] },
    { type: 'item', id: 'cm-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['__enter__ sets up; __exit__ always cleans up', 'returning None lets the error carry on'] },
  ],
  edges: [{ from: 'enter', to: 'body' }, { from: 'body', to: 'ends' }],
})
