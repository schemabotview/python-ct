import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/trust/04-logging/project/main.py?raw'
import session from '../../../spine/trust/04-logging/session.txt?raw'

// §4 — logging instead of print: one basicConfig, a logger per module, levels. Both runs are the
// session's.
export const trustLogging: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'tests/conftest.py', 'tests/test_model.py', 'tests/test_validate.py', 'tests/test_pipeline.py', 'main.py', 'pyproject.toml'], { active: 'main.py' }),
  editor: { file: 'main.py', code, highlight: [...linesFrom(code, 'logging.basicConfig', 'format='), ...linesFrom(code, 'logger.info("October', 'logger.info("wrote')], show: [[lineOf(code, 'logger = '), lineOf(code, 'RAW = ')], [lineOf(code, 'def main'), lineOf(code, 'logger.info("wrote')]] },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'A log record, from call to screen', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'logger', title: 'logging.getLogger(__name__)', sub: 'pipeline.extract: logger.warning(…)', icon: 'code' },
        { type: 'item', id: 'handler', title: 'one handler, from basicConfig', sub: 'drops records below LOG_LEVEL; writes to stderr', icon: 'filter' },
        { type: 'item', id: 'formatter', title: 'its formatter', sub: '%(levelname)s %(name)s: %(message)s', icon: 'table' },
        { type: 'item', id: 'line', title: 'WARNING pipeline.extract: …', sub: 'the line you see', icon: 'terminal', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'levels', title: 'Levels, lowest first', tone: 'store', columns: ['level', 'the pipeline logs'], rows: [
        ['DEBUG', 'each refused row (shown with LOG_LEVEL=DEBUG)'], ['INFO', 'the total, the files written'], ['WARNING', 'a day file that is not UTF-8'],
      ],
    },
    { type: 'item', id: 'lg-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['library modules create records', 'only main decides where they go'] },
    { type: 'note', id: 'lg-note', tone: 'ingest', text: 'LOG_LEVEL=DEBUG python main.py shows every refused row, with no code changed.' },
  ],
  edges: [{ from: 'logger', to: 'handler' }, { from: 'handler', to: 'formatter' }, { from: 'formatter', to: 'line' }],
})
