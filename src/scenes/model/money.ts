import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/04-money/project/pipeline/model.py?raw'
import session from '../../../spine/model/04-money/session.txt?raw'

// §4 — a value object: Money, frozen, with __add__ and __mul__; __eq__, __hash__ and __repr__ come from
// the frozen dataclass. The REPL answers are the session's; FrozenInstanceError was run on 3.15.1.
export const modelMoney: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/model.py' }),
  editor: { file: 'pipeline/model.py', code, highlight: linesFrom(code, '@dataclass(frozen=True)', 'return Money((self.amount'), show: [[lineOf(code, '@dataclass(frozen=True)'), lineOf(code, 'return int(self.amount')]] },
  session,
  side: [
    {
      type: 'group', id: 'mem', title: 'a + b makes a new Money; a and b stay as they were', icon: 'memory', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'names', title: 'names', rows: [['a'], ['b']] },
        {
          type: 'group', id: 'objs', bare: true, children: [
            { type: 'table', id: 'ma', title: 'Money', rows: [['9.95']] },
            { type: 'table', id: 'mb', title: 'Money', rows: [['17.50']] },
            { type: 'table', id: 'mc', title: 'a + b: new, no name', tone: 'store', rows: [['27.45']] },
          ],
        },
      ],
    },
    {
      type: 'table', id: 'cls', title: 'class Money', tone: 'ingest', columns: ['member', 'from'], rows: [
        ['__add__, __mul__ (rounds to the cent)', 'written here'], ['__eq__, __hash__, __repr__', 'dataclass(frozen=True)'], { cells: ['a.amount = 0', 'FrozenInstanceError'], tone: 'consume' },
      ],
    },
    { type: 'table', id: 'asked', title: 'Asked in the REPL', tone: 'store', columns: ['typed', 'answer'], rows: [['a * 3', "Money(amount=Decimal('29.85'))"], ['a == Money(Decimal("9.95"))', 'True'], ['len({a, Money(Decimal("9.95"))})', '1: equal values, one set member']] },
    { type: 'item', id: 'mo-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a value object is equal to any object with the same value', 'to change it, make a new one'] },
    { type: 'note', id: 'mo-note', tone: 'ingest', text: 'Rounding now lives in __mul__: every Money is whole cents, so no caller can forget to round.' },
  ],
  edges: [{ from: 'names.a', to: 'ma' }, { from: 'names.b', to: 'mb' }],
})
