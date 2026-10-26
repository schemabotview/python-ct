import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/ship/01-cli/project/pipeline/cli.py?raw'
import session from '../../../spine/ship/01-cli/session.txt?raw'

// §1 — a command-line interface: argparse, a run subcommand, a checked --month, and an exit code.
// main.py is gone: `python -m pipeline` runs pipeline/__main__.py. The three runs are the session's.
export const shipCli: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/__main__.py', 'pipeline/cli.py', 'pipeline/decorators.py', 'bench/api.py', 'tests/conftest.py', 'tests/test_cli.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'pyproject.toml'], { active: 'pipeline/cli.py', fresh: ['pipeline/cli.py', 'pipeline/__main__.py', 'tests/test_cli.py'], closed: ['bench'] }),
  editor: { file: 'pipeline/cli.py', code, highlight: [...linesFrom(code, 'def month(text', 'return text'), ...linesFrom(code, 'run = commands.add_parser', 'run.add_argument')], show: [[lineOf(code, 'def month(text'), lineOf(code, 'return cli')]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'From the command line to the job', icon: 'terminal', tone: 'ingest', children: [
        { type: 'item', id: 'argv', title: 'sys.argv[1:]', sub: "['run', '--month', '2026-10']", icon: 'code' },
        { type: 'item', id: 'parse', title: 'parser().parse_args()', sub: 'subcommand run; month() checks YYYY-MM', icon: 'filter' },
        { type: 'item', id: 'call', title: 'run("2026-10", raw, out)', sub: 'CsvDays for that month, then the Pipeline', icon: 'zap' },
        { type: 'item', id: 'code', title: 'return 0 or 1', sub: 'sys.exit hands it to the shell', icon: 'check', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'codes', title: 'Exit codes, from the three runs', tone: 'store', columns: ['run', 'exit', 'meaning'], rows: [
        ['--month 2026-10', '0', 'done'], { cells: ['--month october', '2', 'argparse refused it'], tone: 'consume' }, { cells: ['--month 2026-11', '1', 'no day files'], tone: 'consume' },
      ],
    },
    { type: 'item', id: 'cl-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['argparse turns arguments into checked values', 'the exit code is the answer to whoever ran it'] },
    { type: 'note', id: 'cl-note', tone: 'ingest', text: 'python -m pipeline runs pipeline/__main__.py: the package is now the program, and main.py is gone.' },
  ],
  edges: [{ from: 'argv', to: 'parse' }, { from: 'parse', to: 'call' }, { from: 'call', to: 'code' }],
})
