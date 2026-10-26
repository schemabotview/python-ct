import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/speed/01-measure-first/project/pipeline/model.py?raw'
import session from '../../../spine/speed/01-measure-first/session.txt?raw'

// §1 — measure first: cProfile on the whole run. Every number is the session's (volatile: timings and
// counts of start-up calls vary run to run).
export const speedMeasureFirst: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'tests/conftest.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/model.py' }),
  editor: { file: 'pipeline/model.py', code, highlight: [lineOf(code, 'def __post_init__(self) -> None:'), lineOf(code, 'def __mul__')], show: [[lineOf(code, '@dataclass(frozen=True)'), lineOf(code, 'return Money(self.amount * factor)')]] },
  session,
  side: [
    {
      type: 'group', id: 'where', title: 'python main.py under cProfile', icon: 'search', tone: 'ingest', children: [
        { type: 'item', id: 'run', title: '53,938 function calls in 0.071s', sub: 'the whole job, start to finish', icon: 'clock' },
        {
          type: 'table', id: 'top', title: 'where the 71 ms go', tone: 'store', columns: ['part', 'time'], rows: [
            ['importing main and its modules', '36 ms (python -X importtime)'], ['everything else: read, price, write', 'the other 35 ms'],
          ],
        },
      ],
    },
    {
      type: 'table', id: 'ours', title: 'Our code, most calls first', tone: 'ingest', columns: ['calls', 'in model.py'], rows: [
        ['1477', '__post_init__'], ['910', '__mul__'], ['652', '<genexpr>'],
      ],
    },
    { type: 'item', id: 'mf-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['measure before you change anything', 'sort by time for where, by calls for why'] },
    { type: 'table', id: 'why', title: 'Why so many Money objects?', tone: 'ingest', columns: ['per line', 'makes a Money'], rows: [['subtotal: price × quantity', 'each time it is read'], ['the rule search reads subtotal', 'again'], ['total: subtotal × rate', 'again, twice a run']] },
    { type: 'note', id: 'mf-note', tone: 'ingest', text: 'The month takes hundredths of a second, most of it start-up. Money is made 1,477 times for 163 lines: worth knowing, not yet worth changing.' },
  ],
  edges: [{ from: 'run', to: 'top' }],
})
