import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { trustTree } from './tree'
import code from '../../../spine/trust/02-fixtures/project/tests/test_extract.py?raw'
import session from '../../../spine/trust/02-fixtures/session.txt?raw'

export const fixtures: Scene = ideFrame(
  'trust-fixtures',
  'roastery-etl',
  trustTree(2),
  { file: 'tests/test_extract.py', title: 'tests/test_extract.py', code, show: [[8, 26]], highlight: [8, 9, 13, 19, 24, 25], terminal: session },
  {
    id: 'trust-fixtures-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'trust-fixtures-facts',
        kind: 'list',
        icon: 'copy',
        label: "Fixtures and parametrize",
        pattern: 'network',
        items: [
          "@pytest.fixture: a value any test can ask for by name",
          "A fresh catalogue for every test that names it",
          "parametrize: one test body, a row of data per case",
          "Each case is its own test, with its own id",
          "pytest.raises: the test passes only if it fails right",
        ],
      },
      { id: 'trust-fixtures-note', kind: 'note', pattern: 'network', label: "Adding a bad row found in a real file is one more line, not one more test" },
    ],
  },
)
