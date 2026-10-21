import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { trustTree } from './tree'
import code from '../../../spine/trust/03-doubles/project/tests/test_doubles.py?raw'
import session from '../../../spine/trust/03-doubles/session.txt?raw'

export const doubles: Scene = ideFrame(
  'trust-doubles',
  'roastery-etl',
  trustTree(3),
  { file: 'tests/test_doubles.py', title: 'tests/test_doubles.py', code, show: [[6, 7], [10, 11], [14, 26]], highlight: [7, 11, 14, 21], terminal: session },
  {
    id: 'trust-doubles-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'doubles',
        kind: 'table',
        label: "Two things the tests do not control",
        headers: ["what", "the double"],
        values: [
          ["the date", "passed in as today"],
          ["files on disk", "tmp_path: an empty folder"],
          ["extract.RAW", "monkeypatch, for one test"],
        ],
      },
      {
        id: 'trust-doubles-facts',
        kind: 'list',
        icon: 'clock',
        label: "Fake the edges, not the logic",
        pattern: 'network',
        items: [
          "month_to_process(today) takes the date as an argument",
          "January runs December of the year before",
          "month_rows reads a folder the test wrote itself",
          "Everything between the edges is the real code",
        ],
      },
    ],
  },
)
