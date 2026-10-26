import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/trust/07-ruff/project/pipeline/model.py?raw'
import session from '../../../spine/trust/07-ruff/session.txt?raw'

// §7 — ruff: findings by rule, and the formatter at 79 columns. The fix pdb pointed to (Money rounds in
// __post_init__) is in model.py. ruff's output and pytest are the session's.
export const trustRuff: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'tests/conftest.py', 'tests/test_model.py', 'tests/test_validate.py', 'tests/test_pipeline.py', 'tests/test_decorators.py', 'tests/test_transform.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/model.py' }),
  editor: { file: 'pipeline/model.py', code, highlight: linesFrom(code, 'def __post_init__', 'object.__setattr__'), show: [[lineOf(code, '@dataclass(frozen=True)'), lineOf(code, 'return Money(self.amount * factor)')]] },
  session,
  side: [
    {
      type: 'table', id: 'findings', title: 'ruff check: four findings, four rules', tone: 'ingest', columns: ['rule', 'where', 'what'], rows: [
        ['F401', 'transform.py', 'Decimal imported, never used'], ['RUF059', 'main.py', 'cents unpacked, never used'], ['PYI034', 'load.py', '__enter__ should return Self'], ['FURB157', 'model.py', 'Decimal("0") is Decimal(0)'],
      ],
    },
    {
      type: 'group', id: 'flow', title: 'Style, automated', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'check', title: 'ruff check', sub: 'mistakes: unused names, wrong types, old idioms', icon: 'search' },
        { type: 'item', id: 'format', title: 'ruff format', sub: '9 files reformatted to 79 columns', icon: 'code' },
        { type: 'item', id: 'tests', title: 'pytest -q', sub: '15 passed: nothing changed but the layout', icon: 'check', tone: 'store' },
      ],
    },
    { type: 'note', id: 'rf-note', tone: 'ingest', text: 'Two findings are fixed by ruff itself ([*]); the other two take a moment by hand.' },
    { type: 'item', id: 'rf-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a linter finds mistakes, a formatter ends style debates', 'run them on every change, like the tests'] },
  ],
  edges: [{ from: 'check', to: 'format' }, { from: 'format', to: 'tests' }],
})
