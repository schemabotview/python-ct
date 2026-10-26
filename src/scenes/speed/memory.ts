import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/speed/03-memory/project/bench/memory.py?raw'
import session from '../../../spine/speed/03-memory/session.txt?raw'

// §3 — memory: tracemalloc's peak for N months of rows kept in a list against streamed. The KiB are
// the session's (volatile).
export const speedMemory: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'bench/lookup.py', 'bench/memory.py', 'tests/conftest.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'main.py', 'pyproject.toml'], { active: 'bench/memory.py', fresh: ['bench/memory.py'] }),
  editor: { file: 'bench/memory.py', code, highlight: linesFrom(code, 'def peak_kib', 'return peak / 1024'), show: [[lineOf(code, 'def months'), lineOf(code, 'yield from')], [lineOf(code, 'def peak_kib'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'plot', id: 'peak', tone: 'ingest', compact: true, title: 'Peak memory, KiB', x: { labels: ['1 month', '3 months', '12 months'] }, y: { min: 0, max: 1200, step: 200 },
      series: [{ kind: 'line', label: 'list', points: [[0, 341], [1, 364], [2, 1048]] }, { kind: 'line', label: 'streamed', points: [[0, 147], [1, 151], [2, 159]] }],
    },
    {
      type: 'table', id: 'kib', title: 'python -m bench.memory', tone: 'store', columns: ['months', 'as a list', 'streamed'], rows: [
        ['1', '341 KiB', '147 KiB'], ['3', '364 KiB', '151 KiB'], ['12', '1,048 KiB', '159 KiB'],
      ],
    },
    { type: 'note', id: 'me-note', tone: 'ingest', text: 'The streamed peak is mostly the CSV reader itself, and it does not grow with the data.' },
    { type: 'item', id: 'me-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a list holds everything at once', 'a generator holds one row: memory stays flat'] },
  ],
  edges: [],
})
