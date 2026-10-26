import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/trust/03-test-doubles/project/tests/test_pipeline.py?raw'
import session from '../../../spine/trust/03-test-doubles/session.txt?raw'

// §3 — test doubles: a FakeSource and a ListSink fit the protocols, and a fixed clock replaces utc_now.
// The run, the generated stamp (volatile) and mypy are the session's.
export const trustTestDoubles: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'tests/conftest.py', 'tests/test_model.py', 'tests/test_validate.py', 'tests/test_pipeline.py', 'main.py', 'pyproject.toml'], { active: 'tests/test_pipeline.py', fresh: ['tests/test_pipeline.py'] }),
  editor: { file: 'tests/test_pipeline.py', code, highlight: [...linesFrom(code, 'class FakeSource', 'return iter(self.given)'), lineOf(code, 'pipeline = Pipeline(')], show: [[lineOf(code, 'NOON = '), lineOf(code, 'return iter(self.given)')], [lineOf(code, 'def test_a_run'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'shape', title: 'Two sources, one Protocol', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'real', title: 'CsvDays(RAW)', sub: 'the real one: 31 files on disk', icon: 'file' },
        { type: 'item', id: 'source', title: 'Source', sub: 'anything with rows()', icon: 'code' },
        { type: 'item', id: 'fake', title: 'FakeSource([good_row, refused])', sub: 'the test one: two rows in a list', icon: 'boxes', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'doubles', title: 'Real part, and its double', tone: 'ingest', columns: ['part', 'in main.py', 'in the test'], rows: [
        ['source', 'CsvDays', 'FakeSource'], ['sinks', 'report, summary, warehouse', 'ListSink'], ['clock', 'utc_now', 'lambda: NOON'],
      ],
    },
    { type: 'table', id: 'checks', title: 'What the test can now check exactly', tone: 'store', columns: ['assert', ''], rows: [['1 line, 1 refused', 'yes'], ['total "58.90"', 'yes'], ['generated == NOON', 'yes']] },
    { type: 'item', id: 'td-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['double only the edges: files, network, clock', 'the protocol makes the swap free'] },
  ],
  edges: [{ from: 'real', to: 'source', label: 'fits', dashed: true }, { from: 'fake', to: 'source', label: 'fits', dashed: true }],
})
