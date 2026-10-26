import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, linesFrom } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/trust/02-fixtures/project/tests/test_validate.py?raw'
import session from '../../../spine/trust/02-fixtures/session.txt?raw'

// §2 — fixtures and parametrize: good_row comes from conftest.py; one test runs five times. The ids
// and counts are the session's.
export const trustFixtures: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'tests/conftest.py', 'tests/test_model.py', 'tests/test_validate.py', 'main.py', 'pyproject.toml'], { active: 'tests/test_validate.py', fresh: ['tests/conftest.py', 'tests/test_validate.py'] }),
  editor: { file: 'tests/test_validate.py', code, highlight: linesFrom(code, '@pytest.mark.parametrize', 'parse_row({**good_row') },
  session,
  side: [
    {
      type: 'group', id: 'graph', title: 'A fixture in, five cases out', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'fixture', title: 'good_row', sub: 'conftest.py: a fresh valid row for each test', icon: 'file' },
        { type: 'item', id: 'test', title: 'test_a_bad_row_is_refused', sub: 'asks for good_row by name', icon: 'code' },
        {
          type: 'table', id: 'cases', title: 'parametrize: one run per case', tone: 'store', columns: ['id', 'change', 'expects'], rows: [
            ['no-customer', 'customer = ""', 'InvalidRow'], ['quantity-in-words', 'quantity = "three"', 'InvalidRow'], ['negative-quantity', 'quantity = "-1"', 'InvalidRow'],
            ['zero-bags', 'quantity = "0"', 'InvalidRow'], ['unknown-product', 'sku = "GUA-250"', 'UnknownProduct'],
          ],
        },
      ],
    },
    { type: 'table', id: 'run', title: 'pytest -q', tone: 'store', rows: [['11 passed: 5 model tests, 1 good row, 5 bad rows']] },
    { type: 'item', id: 'fx-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a fixture is set-up a test asks for by name', 'parametrize turns one test into many cases'] },
  ],
  edges: [{ from: 'fixture', to: 'test', label: 'injected' }, { from: 'test', to: 'cases', label: '×5' }],
})
