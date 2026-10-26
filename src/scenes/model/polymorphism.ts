import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/07-polymorphism/project/pipeline/model.py?raw'
import session from '../../../spine/model/07-polymorphism/session.txt?raw'

// §7 — polymorphism: three DiscountRule classes answer applies() their own way; line.rule picks the
// first that applies. The October counts are the session's.
export const modelPolymorphism: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'pipeline/errors.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/model.py' }),
  editor: { file: 'pipeline/model.py', code, highlight: [lineOf(code, 'RULES = ('), ...linesFrom(code, 'def rule(self)', 'return next(')], show: [[lineOf(code, 'class Bulk'), lineOf(code, 'return line.quantity >= 10')], [lineOf(code, 'class NoDiscount'), lineOf(code, 'RULES = (')], [lineOf(code, 'def rule(self)') - 1, lineOf(code, 'return next(')]] },
  session,
  side: [
    {
      type: 'group', id: 'tree', title: 'One question, three answers', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'base', title: 'DiscountRule', sub: 'rate, and applies(line) → bool', icon: 'code' },
        {
          type: 'group', id: 'kids', bare: true, dir: 'row', children: [
            { type: 'item', id: 'bulk', title: 'Bulk', sub: '15%: 10+ bags', icon: 'boxes' },
            { type: 'item', id: 'whole', title: 'Wholesale', sub: '5%: 50.00+', icon: 'chart' },
            { type: 'item', id: 'none', title: 'NoDiscount', sub: '0%: always', icon: 'check' },
          ],
        },
      ],
    },
    { type: 'table', id: 'count', title: 'October: the rule each line got', tone: 'store', columns: ['rule', 'lines'], rows: [['NoDiscount', '84'], ['Wholesale', '45'], ['Bulk', '34']] },
    { type: 'table', id: 'order', title: 'How a line finds its rule', tone: 'ingest', columns: ['asked in order', 'first yes'], rows: [['Bulk: 10 or more bags?', '15% off'], ['Wholesale: 50.00 or more?', '5% off'], ['NoDiscount: always', 'full price']] },
    { type: 'item', id: 'po-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['one method name, a version per class', 'the object decides which version runs'] },
    { type: 'note', id: 'po-note', tone: 'ingest', text: 'line.rule asks each rule in RULES order and takes the first yes. A new discount is a new class, not another elif.' },
  ],
  edges: [{ from: 'base', to: 'kids', label: 'subclasses' }],
})
