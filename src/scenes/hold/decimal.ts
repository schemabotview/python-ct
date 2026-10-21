import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/03-decimal/project/main.py?raw'
import session from '../../../spine/hold/03-decimal/session.txt?raw'

export const decimalMoney: Scene = ideFrame(
  'hold-decimal',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [3, 5, 6, 10, 11, 12, 17], terminal: session },
  {
    id: 'hold-decimal-facts',
    kind: 'list',
    pills: true,
    icon: 'receipt',
    label: 'Money is a Decimal',
    sub: 'from the moment it appears',
    pattern: 'storage',
    items: [
      'Build it from a string: Decimal("9.95") is exactly 9.95',
      'Decimal(9.95) keeps the float’s error — 49 digits of it',
      'Sums in decimal digits are exact: 0.1 + 0.2 == 0.3',
      'quantize(CENT) rounds to cents; name the rule: ROUND_HALF_UP',
      'Decimal × float is a TypeError on purpose — no silent mixing',
      'UPPER_CASE names are constants, by convention only',
    ],
  },
)
