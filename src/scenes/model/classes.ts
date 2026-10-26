import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, linesFrom } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/01-classes/project/pipeline/model.py?raw'
import session from '../../../spine/model/01-classes/session.txt?raw'

// §1 — a class: Product, with __init__ and self. Every value on the right is the session's.
export const modelClasses: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/model.py', fresh: ['pipeline/model.py'] }),
  editor: { file: 'pipeline/model.py', code, highlight: linesFrom(code, 'def __init__', 'self.price = price') },
  session,
  side: [
    {
      type: 'group', id: 'mem', title: 'kenya = CATALOGUE["KEN-1000"], in memory', icon: 'memory', tone: 'ingest', children: [
        { type: 'table', id: 'names', title: 'name', rows: [['kenya']] },
        { type: 'table', id: 'obj', title: 'a Product object: vars(kenya)', tone: 'store', columns: ['attribute', 'value'], rows: [['sku', "'KEN-1000'"], ['name', "'Kenya Nyeri'"], ['price', "Decimal('31.00')"]] },
        { type: 'table', id: 'cls', title: 'class Product', tone: 'ingest', columns: ['method', 'does'], rows: [['__init__(self, sku, name, price)', 'fills a new object'], ['cost(self, quantity)', 'price × quantity']] },
      ],
    },
    { type: 'table', id: 'asked', title: 'Asked in the REPL', tone: 'store', columns: ['typed', 'answer'], rows: [['kenya.name, kenya.price', "'Kenya Nyeri', Decimal('31.00')"], ['kenya.cost(3)', "Decimal('93.00')"], ['type(kenya)', "<class 'pipeline.model.Product'>"]] },
    { type: 'item', id: 'cl-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['data lives on the object, methods on the class', 'self is the object a method was called on'] },
  ],
  edges: [{ from: 'names', to: 'obj' }, { from: 'obj', to: 'cls', label: 'type(kenya)' }],
})
