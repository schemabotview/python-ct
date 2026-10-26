import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/ship/02-config/project/pipeline/config.py?raw'
import session from '../../../spine/ship/02-config/session.txt?raw'

// §2 — configuration and secrets: defaults, roastery.toml, ROASTERY_* variables, then flags; the API
// token only from the environment, and never printed. Both runs are the session's.
export const shipConfig: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/__main__.py', 'pipeline/cli.py', 'pipeline/decorators.py', 'bench/api.py', 'roastery.toml', 'tests/conftest.py', 'tests/test_cli.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'pyproject.toml'], { active: 'pipeline/config.py', fresh: ['pipeline/config.py', 'roastery.toml'], closed: ['bench'] }),
  editor: { file: 'pipeline/config.py', code, highlight: [lineOf(code, 'ENV_ONLY = '), ...linesFrom(code, 'def load_config', 'return merged(config, env)')], show: [[lineOf(code, 'ENV_ONLY = '), lineOf(code, 'ENV_ONLY = ')], [lineOf(code, 'def load_config'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'chain', title: 'Each layer overrides the one before', icon: 'layers', tone: 'ingest', children: [
        { type: 'item', id: 'default', title: 'defaults', sub: 'Config(): data/raw, data/out, INFO', icon: 'code' },
        { type: 'item', id: 'file', title: 'roastery.toml', sub: 'read with tomllib: log_level = "WARNING"', icon: 'file' },
        { type: 'item', id: 'env', title: 'ROASTERY_* variables', sub: 'the only home of the API token', icon: 'lock' },
        { type: 'item', id: 'flag', title: '--out on the command line', sub: 'the last word', icon: 'terminal', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'won', title: 'The second run: who set what', tone: 'store', columns: ['setting', 'value', 'from'], rows: [
        ['log_level', 'INFO', 'environment, over the file'], ['out', 'x', 'flag'], ['api_token', '(set)', 'environment: shown, never printed'],
      ],
    },
    { type: 'item', id: 'cf-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['later layers win: default, file, environment, flag', 'a secret comes only from the environment'] },
    { type: 'note', id: 'cf-note', tone: 'ingest', text: 'roastery.toml is safe to commit: it holds no secret, and load_config ignores api_token even if someone writes it there.' },
  ],
  edges: [{ from: 'default', to: 'file' }, { from: 'file', to: 'env' }, { from: 'env', to: 'flag' }],
})
