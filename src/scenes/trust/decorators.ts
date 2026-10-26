import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/trust/05-decorators/project/pipeline/decorators.py?raw'
import session from '../../../spine/trust/05-decorators/session.txt?raw'

// §5 — decorators and closures: @timed wraps Pipeline.run; the wrapper's closure cell holds the original.
// The run (timing volatile), the tests and the closure are the session's.
export const trustDecorators: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'tests/conftest.py', 'tests/test_model.py', 'tests/test_validate.py', 'tests/test_pipeline.py', 'tests/test_decorators.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/decorators.py', fresh: ['pipeline/decorators.py', 'tests/test_decorators.py'] }),
  editor: { file: 'pipeline/decorators.py', code, highlight: linesFrom(code, 'def timed', 'return wrapper'), show: [[lineOf(code, 'logger = '), lineOf(code, 'return wrapper')], [lineOf(code, 'def retry'), lineOf(code, ') -> Callable[[Callable')]] },
  session,
  side: [
    {
      type: 'group', id: 'mem', title: 'After @timed: Pipeline.run is the wrapper', icon: 'memory', tone: 'ingest', children: [
        { type: 'item', id: 'name', title: 'Pipeline.run', sub: 'the name the class keeps', icon: 'code' },
        { type: 'item', id: 'wrapper', title: 'wrapper(*args, **kwargs)', sub: 'starts the clock, calls function, logs the time', icon: 'clock' },
        { type: 'table', id: 'cell', title: 'its closure cell: function', tone: 'store', rows: [["the original run: 'Pipeline.run'"]] },
      ],
    },
    {
      type: 'table', id: 'means', title: 'What the @ line means', tone: 'ingest', columns: ['you write', 'Python does'], rows: [
        ['@timed above def run', 'run = timed(run)'], ['@retry(OSError, attempts=3)', 'f = retry(OSError, attempts=3)(f)'], ['functools.wraps', 'the wrapper keeps the name and docstring'],
      ],
    },
    { type: 'table', id: 'tests', title: 'retry, tested', tone: 'store', columns: ['test', 'calls'], rows: [['flaky: fails twice, then works', '3, returns "done"'], ['broken: always fails', '2, then raises']] },
    { type: 'item', id: 'dk-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a decorator takes a function and returns one', 'a closure keeps the variables it was made with'] },
  ],
  edges: [{ from: 'name', to: 'wrapper' }, { from: 'wrapper', to: 'cell', label: 'closes over' }],
})
