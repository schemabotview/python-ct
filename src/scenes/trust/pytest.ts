import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/trust/01-pytest/project/tests/test_model.py?raw'
import session from '../../../spine/trust/01-pytest/session.txt?raw'

// §1 — pytest: tests/test_model.py, five plain-assert tests of Money and the rules. The run and the
// collected names are the session's (timings vary: a volatile step).
export const trustPytest: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'tests/test_model.py', 'main.py', 'pyproject.toml'], { active: 'tests/test_model.py', fresh: ['tests/', 'tests/test_model.py'] }),
  editor: { file: 'tests/test_model.py', code, highlight: linesFrom(code, 'def test_ten_bags', 'assert line.total == Money(Decimal("263.50"))'), show: [[lineOf(code, 'from pipeline.model'), lineOf(code, 'KENYA = ')], [lineOf(code, 'def test_ten_bags'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'One test, three steps', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'arrange', title: 'arrange', sub: 'LineItem(…, KENYA, 10): ten bags at 31.00', icon: 'code' },
        { type: 'item', id: 'act', title: 'act', sub: 'line.rule, line.total: the code under test', icon: 'zap' },
        { type: 'item', id: 'assert', title: 'assert', sub: 'Bulk, and Money("263.50"): or the test fails', icon: 'check', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'finds', title: 'How pytest finds tests', tone: 'ingest', columns: ['it looks for', 'here'], rows: [
        ['files named test_*.py', 'tests/test_model.py'], ['functions named test_*', 'five of them'], ['a plain assert', 'no special methods to learn'],
      ],
    },
    { type: 'table', id: 'run', title: 'pytest -q', tone: 'store', rows: [['.....  5 passed']] },
    { type: 'note', id: 'py-note', tone: 'ingest', text: 'Each expected number is worked out by hand: 10 × 31.00 less 15% is 263.50. A test that copies the answer from the code checks nothing.' },
    { type: 'item', id: 'py-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a test is a function that asserts', 'pytest finds, runs and reports them all'] },
  ],
  edges: [{ from: 'arrange', to: 'act' }, { from: 'act', to: 'assert' }],
})
