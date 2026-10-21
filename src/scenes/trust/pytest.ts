import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { trustTree } from './tree'
import code from '../../../spine/trust/01-pytest/project/tests/test_transform.py?raw'
import session from '../../../spine/trust/01-pytest/session.txt?raw'

export const pytestScene: Scene = ideFrame(
  'trust-pytest',
  'roastery-etl',
  trustTree(1),
  { file: 'tests/test_transform.py', title: 'tests/test_transform.py', code, highlight: [6, 7, 10, 11, 14, 15], terminal: session },
  {
    id: 'trust-pytest-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'rules-tested',
        kind: 'table',
        label: "The three discount rules, one test each",
        headers: ["order", "expected"],
        values: [
          ["3 × $9.95 = $29.85", "no discount"],
          ["3 × $17.50 = $52.50", "5% off: $49.88"],
          ["12 × $17.50 = $210", "15% off: $178.50"],
        ],
      },
      {
        id: 'trust-pytest-facts',
        kind: 'list',
        icon: 'circlecheck',
        label: "A test is a function that asserts",
        pattern: 'network',
        items: [
          "pytest runs every test_ function in tests/",
          "assert says what must be true",
          "One dot per passing test, F for a failure",
          "The test names read as the rules themselves",
        ],
      },
    ],
  },
)
