import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, lastLine } from '../ide'
import { codeTree, PACKAGE } from './tree'
import code from '../../../spine/structure/05-mypy/project/pipeline/transform.py?raw'
import session from '../../../spine/structure/05-mypy/session.txt?raw'

// §5 — pyproject.toml, mypy installed into .venv, and the real bug it finds: sum() of an empty list is
// the int 0, not a Decimal. mypy's report and the REPL pair are the session's.
export const structureMypy: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'main.py', 'pyproject.toml'], { active: 'pipeline/transform.py', fresh: ['pyproject.toml'] }),
  editor: { file: 'pipeline/transform.py', code, highlight: [lineOf(code, '"total": sum(totals)')], show: [[lineOf(code, 'def summarise'), lineOf(code, 'totals: list')], [lineOf(code, 'ranked = sorted'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'From pyproject.toml to a bug report', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'toml', title: 'pyproject.toml', sub: 'the project, its dev tools, [tool.mypy]', icon: 'file' },
        { type: 'item', id: 'venv', title: '.venv', sub: 'pip install -q mypy==2.4.0', icon: 'package' },
        { type: 'item', id: 'mypy', title: 'mypy', sub: 'reads 6 files and the hints; runs nothing', icon: 'search' },
        { type: 'item', id: 'err', title: 'transform.py:82', sub: '"total" gets Decimal | Literal[0], not Decimal', icon: 'bell', tone: 'consume' },
      ],
    },
    { type: 'table', id: 'why', title: 'Why: sum starts at the int 0', tone: 'store', columns: ['typed', 'answer'], rows: [{ cells: ['sum([])', '0'], tone: 'consume' }, ['sum([], Decimal("0"))', "Decimal('0')"]] },
    { type: 'table', id: 'toml-file', title: 'pyproject.toml', tone: 'store', columns: ['table', 'says'], rows: [['[project]', 'roastery-etl 0.1.0, Python >=3.15'], ['[dependency-groups]', 'dev = ["mypy==2.4.0"]'], ['[tool.mypy]', 'files = ["main.py", "pipeline"]']] },
    { type: 'note', id: 'my-note', tone: 'ingest', text: 'The fix is one argument, a start value: sum(totals, Decimal("0")). Course 9 opens with it.' },
  ],
  edges: [{ from: 'toml', to: 'venv' }, { from: 'venv', to: 'mypy' }, { from: 'mypy', to: 'err' }],
})
