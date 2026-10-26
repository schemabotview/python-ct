import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/speed/04-cpu-or-io/project/bench/cpu_or_io.py?raw'
import session from '../../../spine/speed/04-cpu-or-io/session.txt?raw'

// §4 — CPU-bound or I/O-bound: wall-clock time against CPU time. The seconds are the session's
// (volatile).
export const speedCpuOrIo: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'bench/lookup.py', 'bench/memory.py', 'bench/cpu_or_io.py', 'tests/conftest.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'main.py', 'pyproject.toml'], { active: 'bench/cpu_or_io.py', fresh: ['bench/cpu_or_io.py'] }),
  editor: { file: 'bench/cpu_or_io.py', code, highlight: linesFrom(code, 'wall, cpu = time.perf_counter()', 'kind = '), show: [[lineOf(code, 'def price_the_month'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'plot', id: 'time', tone: 'ingest', compact: true, title: 'Seconds: wall clock and CPU', x: { labels: ['price: wall', 'price: CPU', 'wait: wall', 'wait: CPU'] }, y: { min: 0, max: 0.6, step: 0.1 },
      series: [{ kind: 'bar', points: [[0, 0.05], [1, 0.05]] }, { kind: 'bar', points: [[2, 0.5], [3, 0]] }],
    },
    {
      type: 'table', id: 'pick', title: 'The question that picks the tool', tone: 'store', columns: ['the time goes to', 'so it is', 'use'], rows: [
        ['computing', 'CPU-bound', 'processes; 3.15t'], ['waiting', 'I/O-bound', 'threads; asyncio'],
      ],
    },
    { type: 'item', id: 'ci-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['CPU time close to wall time: computing', 'CPU time near zero: waiting'] },
    { type: 'note', id: 'ci-note', tone: 'ingest', text: 'Our month is CPU-bound and tiny. The shop’s API, coming in §7, is the opposite: almost all waiting.' },
  ],
  edges: [],
})
