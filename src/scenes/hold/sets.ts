import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/09-sets/project/main.py?raw'
import session from '../../../spine/hold/09-sets/session.txt?raw'

export const sets: Scene = ideFrame(
  'hold-sets',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [3, 6, 9, 10, 11], terminal: session },
  {
    id: 'hold-sets-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'set-ops',
        kind: 'table',
        label: 'Today against yesterday',
        headers: ['expression', 'means', 'result'],
        values: [
          ['today & yesterday', 'returning', 'lena, maya'],
          ['today - yesterday', 'new', 'raj'],
          ['today | yesterday', 'everyone', 'lena, maya, omar, raj'],
        ],
      },
      {
        id: 'hold-sets-facts',
        kind: 'list',
        icon: 'fingerprint',
        label: 'A set holds each value once',
        pattern: 'user',
        items: [
          'Six orders, three distinct customers',
          '"raj" in today is one hash lookup',
          'No order: sort it before printing',
          '{} is an empty dict; set() is an empty set',
        ],
      },
    ],
  },
)
