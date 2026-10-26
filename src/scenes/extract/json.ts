import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { dataTree, DAYS_1_3 } from './tree'
import code from '../../../spine/extract/05-json/project/main.py?raw'
import session from '../../../spine/extract/05-json/session.txt?raw'

// §5 — JSON: the catalogue leaves the code; prices are strings in the file and become Decimal.
// BRA-500 (16.25) is the session's; ORD-1006 and ORD-1012 now price.
export const extractJson: SceneModel = ideFrame({
  tree: dataTree([...DAYS_1_3, 'catalogue.json'], { fresh: ['catalogue.json'] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def read_catalogue', 'CATALOGUE = read_catalogue'), show: [[1, 6], [lineOf(code, 'def read_catalogue'), lineOf(code, 'CATALOGUE = read_catalogue')]] },
  session,
  side: [
    {
      type: 'group', id: 'map', title: 'catalogue.json → Python', icon: 'workflow', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'json', title: 'JSON', rows: [['{ … }', 'object'], ['"9.95"', 'string'], ['31.0', 'number']] },
        { type: 'table', id: 'py', title: 'Python', rows: [['dict'], ['str → Decimal("9.95")'], ['float: never for money']] },
      ],
    },
    {
      type: 'table', id: 'cat', title: 'CATALOGUE, read from the file', tone: 'store', columns: ['sku', 'name', 'price'], rows: [
        ['ETH-250', 'Ethiopia Yirgacheffe', '9.95'], ['COL-500', 'Colombia Huila', '17.50'], ['KEN-1000', 'Kenya Nyeri', '31.00'], { cells: ['BRA-500', 'Brazil Cerrado', '16.25'], tone: 'store' },
      ],
    },
    { type: 'table', id: 'printed', title: 'The run now', tone: 'ingest', rows: [['total: 608.50 | rejected: 1'], ["rejected ORD-1005: quantity 'three'"]] },
    { type: 'item', id: 'js-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['data that changes lives in files', 'prices as strings: exact as Decimal'] },
    { type: 'table', id: 'file', title: 'catalogue.json, as the shop wrote it', tone: 'ingest', rows: [['"BRA-500": {'], ['  "name": "Brazil Cerrado",'], ['  "price": "16.25"'], ['}']] },
  ],
  edges: [{ from: 'json', to: 'py', label: 'json.loads' }],
})
