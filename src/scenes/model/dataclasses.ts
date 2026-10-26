import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/02-dataclasses/project/pipeline/model.py?raw'
import session from '../../../spine/model/02-dataclasses/session.txt?raw'

// §2 — @dataclass: Product and LineItem declare fields, and the decorator writes __init__, __repr__ and
// __eq__. The repr, total() and the equality are the session's.
export const modelDataclasses: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/model.py' }),
  editor: { file: 'pipeline/model.py', code, highlight: linesFrom(code, 'class LineItem', 'quantity: int'), show: [[lineOf(code, '@dataclass'), lineOf(code, 'price: Decimal')], [lineOf(code, 'class LineItem'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'gen', title: 'What @dataclass writes for LineItem', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'decl', title: 'you write five fields and total()', sub: 'id, date, customer, product, quantity', icon: 'code' },
        {
          type: 'table', id: 'cls', title: 'class LineItem, after the decorator', tone: 'store', columns: ['member', 'written by'], rows: [
            ['__init__(self, id, date, customer, product, quantity)', '@dataclass'], ['__repr__: LineItem(id=…, …)', '@dataclass'], ['__eq__: same fields, equal', '@dataclass'], { cells: ['total()', 'you'], tone: 'ingest' },
          ],
        },
      ],
    },
    { type: 'table', id: 'asked', title: 'Asked in the REPL', tone: 'store', columns: ['typed', 'answer'], rows: [['line.total()', "Decimal('61.75')"], ['line == LineItem(**vars(line))', 'True']] },
    { type: 'table', id: 'before', title: 'Product, before and after', tone: 'ingest', columns: ['', 'you write'], rows: [['a plain class', 'def __init__ and three self.x = x'], ['@dataclass', 'sku: str, name: str, price: Decimal']] },
    { type: 'item', id: 'dc-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['list the fields; the decorator writes the rest', 'equality compares values, not identity'] },
    { type: 'note', id: 'dc-note', tone: 'ingest', text: 'parse_row now returns a LineItem, so the rest of the pipeline says line.quantity, not line["quantity"]: a typo is an error, not a missing key.' },
  ],
  edges: [{ from: 'decl', to: 'cls', label: '@dataclass' }],
})
