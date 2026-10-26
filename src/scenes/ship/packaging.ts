import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/ship/03-packaging/project/pyproject.toml?raw'
import session from '../../../spine/ship/03-packaging/session.txt?raw'

// §3 — packaging: a build backend, an entry point, a wheel, a clean install in a fresh venv. Every
// command and its output are the session's.
export const shipPackaging: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/__main__.py', 'pipeline/cli.py', 'pipeline/decorators.py', 'bench/api.py', 'roastery.toml', 'tests/conftest.py', 'tests/test_cli.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'pyproject.toml'], { active: 'pyproject.toml', closed: ['bench'] }),
  editor: { file: 'pyproject.toml', code, lang: 'text', highlight: [...linesFrom(code, '[build-system]', 'build-backend'), ...linesFrom(code, '[project.scripts]', 'roastery-etl = ')], show: [[1, lineOf(code, 'roastery-etl = ')], [lineOf(code, '[tool.setuptools]'), lineOf(code, 'packages = ')]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'From a folder to a command', icon: 'package', tone: 'ingest', children: [
        { type: 'item', id: 'toml', title: 'pyproject.toml', sub: 'name, version, the package, the entry point', icon: 'file' },
        { type: 'item', id: 'wheel', title: 'roastery_etl-0.1.0-py3-none-any.whl', sub: 'pip wheel: one file to install anywhere', icon: 'package' },
        { type: 'item', id: 'clean', title: 'a fresh venv: pip install the wheel', sub: 'no source checkout needed', icon: 'boxes' },
        { type: 'item', id: 'cmd', title: 'roastery-etl', sub: 'a real command: --version says 0.1.0', icon: 'terminal', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'tables', title: 'What the new tables say', tone: 'store', columns: ['table', 'says'], rows: [
        ['[build-system]', 'build with setuptools 84.2.1'], ['[project.scripts]', 'roastery-etl runs pipeline.cli:main'], ['[tool.setuptools]', 'the package is pipeline/'],
      ],
    },
    { type: 'item', id: 'pk-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a wheel is the project, ready to install', 'an entry point makes a command'] },
  ],
  edges: [{ from: 'toml', to: 'wheel' }, { from: 'wheel', to: 'clean' }, { from: 'clean', to: 'cmd' }],
})
