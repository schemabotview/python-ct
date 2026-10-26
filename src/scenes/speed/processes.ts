import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/speed/06-processes/project/bench/processes.py?raw'
import session from '../../../spine/speed/06-processes/session.txt?raw'

// §6 — processes: ProcessPoolExecutor, one process per file and four for the heavy job. The seconds are
// the session's (volatile).
export const speedProcesses: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'bench/lookup.py', 'bench/memory.py', 'bench/cpu_or_io.py', 'bench/threads.py', 'bench/processes.py', 'tests/conftest.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'main.py', 'pyproject.toml'], { active: 'bench/processes.py', fresh: ['bench/processes.py'] }),
  editor: { file: 'bench/processes.py', code, highlight: linesFrom(code, 'with ProcessPoolExecutor(4) as pool', 'lambda: len(set(pool.map'), show: [[lineOf(code, 'def price_the_month'), lineOf(code, 'return summarise')], [lineOf(code, 'if __name__'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'pool', title: 'ProcessPoolExecutor(4)', icon: 'cpu', tone: 'ingest', children: [
        { type: 'item', id: 'parent', title: 'the main process', sub: 'pool.map(work, jobs): send each job out', icon: 'code' },
        { type: 'item', id: 'workers', title: '4 worker processes', sub: 'each its own interpreter, its own GIL', icon: 'boxes' },
        { type: 'item', id: 'back', title: 'results, in order', sub: 'pickled back to the main process', icon: 'check', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'times', title: 'python -m bench.processes', tone: 'store', columns: ['work', '1 process', '4 processes'], rows: [
        ['31 tiny files', '0.00s', '0.08s: start-up costs more'], ['the month ×200', '0.38s', '0.14s'],
      ],
    },
    { type: 'item', id: 'pr-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a process has its own interpreter and its own GIL', 'a job must be big enough to be worth sending'] },
    { type: 'note', id: 'pr-note', tone: 'ingest', text: 'The main guard matters: each worker may import the script, and must not start a pool of its own.' },
  ],
  edges: [{ from: 'parent', to: 'workers', label: 'jobs' }, { from: 'workers', to: 'back' }],
})
