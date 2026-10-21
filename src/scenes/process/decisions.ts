import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/02-decisions/project/main.py?raw'
import session from '../../../spine/process/02-decisions/session.txt?raw'

export const decisions: Scene = ideFrame(
  'process-decisions',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [16, 17, 18, 19, 20, 21, 24], show: [[1, 1], [12, 25]], terminal: session },
  {
    id: 'process-decisions-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'discount-rules',
        kind: 'table',
        label: 'The discount rules, tested in order',
        headers: ['test', 'rule', 'discount'],
        values: [
          ['quantity >= 10', 'wholesale', '15%'],
          ['subtotal >= $50', 'large order', '5%'],
          ['otherwise', '—', 'none'],
        ],
      },
      {
        id: 'process-decisions-facts',
        kind: 'list',
        pills: true,
        icon: 'merge',
        label: 'if / elif / else',
        pattern: 'network',
        items: [
          'Tests run top to bottom; the first true one wins',
          'elif is tested only when everything above was false',
          'ORD-1002: 3 bags is not wholesale, but $52.50 ≥ $50',
          '5% off $52.50 is $49.875, rounded to $49.88',
          'if not order.get("coupon"): missing and empty alike',
        ],
      },
    ],
  },
)
