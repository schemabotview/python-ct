import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/10-composition/project/main.py?raw'
import session from '../../../spine/model/10-composition/session.txt?raw'

// §10 — composition: Pipeline has a source and sinks; main.py builds one and runs it. The run, mypy and
// Pipeline.__mro__ are the session's.
export const modelComposition: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'pipeline/errors.py', 'pipeline/ports.py', 'pipeline/run.py', 'main.py', 'pyproject.toml'], { active: 'main.py', fresh: ['pipeline/run.py'] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'with SqliteWarehouse', 'result = pipeline.run()'), show: [[lineOf(code, 'from pipeline.extract'), lineOf(code, 'from pipeline.run')], [lineOf(code, 'def main'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'parts', title: 'A Pipeline has parts; it inherits nothing', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'pipe', title: 'Pipeline(source, sinks)', sub: 'run(): rows → Orders → summary → every sink', icon: 'boxes', tone: 'store' },
        {
          type: 'group', id: 'has', bare: true, dir: 'row', children: [
            { type: 'item', id: 'src', title: 'source', sub: 'CsvDays(RAW)', icon: 'file' },
            { type: 'item', id: 'snk', title: 'sinks', sub: 'CsvReport, JsonSummary, SqliteWarehouse', icon: 'database' },
          ],
        },
      ],
    },
    { type: 'table', id: 'main', title: 'main(): the whole job, as parts', tone: 'ingest', columns: ['part', 'is'], rows: [['source', 'CsvDays(RAW)'], ['sinks', 'report, summary, warehouse'], ['pipeline.run()', 'the Result']] },
    { type: 'table', id: 'mro', title: 'Pipeline.__mro__', tone: 'store', rows: [["<class 'pipeline.run.Pipeline'>"], ["<class 'object'>"]] },
    { type: 'table', id: 'run', title: 'python main.py', tone: 'ingest', rows: [['October: 11578.88 | priced: 163 | rejected: 13'], ['mypy: Success, 10 source files']] },
    { type: 'item', id: 'cp-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['has-a, not is-a', 'swap a part and nothing else changes'] },
    { type: 'note', id: 'cp-note', tone: 'ingest', text: 'Swap a part, not a parent: a test can hand Pipeline a fake source and a list as its sink.' },
  ],
  edges: [{ from: 'pipe', to: 'has', label: 'has-a' }],
})
