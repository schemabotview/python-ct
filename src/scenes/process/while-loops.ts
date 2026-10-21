import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/05-while/project/main.py?raw'
import session from '../../../spine/process/05-while/session.txt?raw'

export const whileLoops: Scene = ideFrame(
  'process-while',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [6, 7, 10, 14], terminal: session },
  {
    id: 'process-while-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'loop-words',
        kind: 'table',
        label: 'Steering a loop',
        headers: ['statement', 'does'],
        values: [
          ['while queue:', 'repeat while the list is non-empty'],
          ['continue', 'skip to the next pass'],
          ['break', 'leave the loop now'],
        ],
      },
      {
        id: 'process-while-facts',
        kind: 'list',
        pills: true,
        icon: 'clock',
        label: 'while repeats until a condition fails',
        pattern: 'network',
        items: [
          'pop(0) takes the first row off the queue',
          'A quantity of 0 is skipped, not priced',
          'END is a trailer row: stop there',
          'for: every item of a collection',
          'while: until something changes',
        ],
      },
    ],
  },
)
