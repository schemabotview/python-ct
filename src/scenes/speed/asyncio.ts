import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/speed/07-asyncio/project/pipeline/extract.py?raw'
import session from '../../../spine/speed/07-asyncio/session.txt?raw'

// §7 — asyncio: ApiSource sends all 31 requests on one thread and awaits them together. The stub API
// answers each in 0.1s; the seconds are the session's (volatile).
export const speedAsyncio: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'bench/lookup.py', 'bench/memory.py', 'bench/cpu_or_io.py', 'bench/threads.py', 'bench/processes.py', 'bench/api.py', 'tests/conftest.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/extract.py', fresh: ['bench/api.py'] }),
  editor: { file: 'pipeline/extract.py', code, highlight: [lineOf(code, 'async def fetch(self'), lineOf(code, 'reader, writer = await'), lineOf(code, 'response = await reader.read()'), ...linesFrom(code, 'async def fetch_all', 'for text in asyncio.run(')], show: [[lineOf(code, 'class ApiSource'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'loop', title: 'One thread, one event loop', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'run', title: 'asyncio.run(fetch_all())', sub: 'starts the loop', icon: 'zap' },
        { type: 'item', id: 'gather', title: 'gather: 31 fetch() tasks', sub: 'each sends its request, then awaits', icon: 'layers' },
        { type: 'item', id: 'wait', title: 'all 31 suspended at once', sub: 'the loop resumes each as its answer arrives', icon: 'clock', tone: 'store' },
      ],
    },
    {
      type: 'plot', id: 'secs', tone: 'store', compact: true, title: '31 requests, 0.1s each: seconds', x: { labels: ['one at a time', 'all at once'] }, y: { min: 0, max: 3.5, step: 0.5 },
      series: [{ kind: 'bar', points: [[0, 3.23], [1, 0.14]] }],
    },
    { type: 'item', id: 'as-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['async def pauses at await; the loop runs the rest', 'one thread overlaps every wait'] },
  ],
  edges: [{ from: 'run', to: 'gather' }, { from: 'gather', to: 'wait' }],
})
