import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/speed/02-data-structures/project/pipeline/validate.py?raw'
import session from '../../../spine/speed/02-data-structures/session.txt?raw'

// §2 — the right data structure: Orders keeps its ids in a set, so `in` is a hash lookup, not a scan.
// The timings are the session's (volatile).
export const speedDataStructures: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'bench/lookup.py', 'tests/conftest.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/validate.py', fresh: ['bench/lookup.py'] }),
  editor: { file: 'pipeline/validate.py', code, highlight: [lineOf(code, 'self.ids = {'), lineOf(code, 'return order_id in self.ids')], show: [[lineOf(code, 'class Orders'), lineOf(code, 'self.ids = {')], [lineOf(code, 'def __contains__'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'plot', id: 'lookup', tone: 'ingest', compact: true, title: 'One missing id: time for `in`, in µs', x: { labels: ['1,000', '10,000', '100,000'] }, y: { min: 0, max: 800, step: 200 },
      series: [{ kind: 'line', label: 'list', points: [[0, 9.7], [1, 87], [2, 772.3]] }, { kind: 'line', label: 'set', points: [[0, 0.031], [1, 0.023], [2, 0.048]] }],
    },
    {
      type: 'table', id: 'times', title: 'python -m bench.lookup', tone: 'store', columns: ['n', 'list', 'set'], rows: [
        ['1,000', '9.7 µs', '0.031 µs'], ['10,000', '87 µs', '0.023 µs'], ['100,000', '772.3 µs', '0.048 µs'],
      ],
    },
    { type: 'note', id: 'ds-note', tone: 'ingest', text: 'Orders builds its set once, in __init__; every `in` after that is one hash.' },
    { type: 'item', id: 'ds-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a list checks every item; a set hashes once', 'ten times the data: ten times the scan, the same lookup'] },
  ],
  edges: [],
})
