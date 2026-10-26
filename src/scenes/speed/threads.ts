import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/speed/05-threads/project/bench/threads.py?raw'
import session from '../../../spine/speed/05-threads/session.txt?raw'

// §5 — threads and the GIL: 200 month-pricings on 1 and 4 threads, on python3.15 and python3.15t. The
// seconds are the session's (volatile); the narration claims only what re-runs (slower vs faster).
export const speedThreads: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'bench/lookup.py', 'bench/memory.py', 'bench/cpu_or_io.py', 'bench/threads.py', 'tests/conftest.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'main.py', 'pyproject.toml'], { active: 'bench/threads.py', fresh: ['bench/threads.py'] }),
  editor: { file: 'bench/threads.py', code, highlight: linesFrom(code, 'for workers in (1, 4)', 'totals = set(pool.map'), show: [[lineOf(code, 'MONTH = '), lastLine(code)]] },
  session,
  side: [
    {
      type: 'plot', id: 'wall', tone: 'ingest', compact: true, title: 'Wall time, seconds', x: { labels: ['GIL: 1', 'GIL: 4', '3.15t: 1', '3.15t: 4'] }, y: { min: 0, max: 1.6, step: 0.4 },
      series: [{ kind: 'bar', points: [[0, 0.57], [1, 1.71]] }, { kind: 'bar', points: [[2, 0.57], [3, 0.35]] }],
    },
    {
      type: 'table', id: 'why', title: 'Same code, two builds', tone: 'store', columns: ['build', '4 threads', 'because'], rows: [
        { cells: ['python3.15', 'slower', 'one thread runs Python at a time'], tone: 'consume' }, ['python3.15t', 'faster', 'no GIL: all four run at once'],
      ],
    },
    { type: 'note', id: 'th-note', tone: 'ingest', text: 'Each job reads its own copy of the month. Jobs sharing one list of rows got no faster even on 3.15t: shared objects cost.' },
    { type: 'item', id: 'th-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['the GIL lets one thread run Python at a time', 'the free-threaded build removes it'] },
  ],
  edges: [],
})
