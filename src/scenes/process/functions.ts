import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { PROCESS_TREE } from './tree'
import main from '../../../spine/process/07-functions/project/main.py?raw'
import session from '../../../spine/process/07-functions/session.txt?raw'

export const functions: Scene = ideFrame(
  'process-functions',
  'roastery-etl',
  PROCESS_TREE,
  { file: 'main.py', code: main, highlight: [20, 21, 30, 35], show: [[1, 1], [20, 23], [30, 39]], terminal: session },
  {
    id: 'process-functions-facts',
    kind: 'list',
    icon: 'cog',
    label: 'price_line(): one named step',
    sub: 'written once, called for every order',
    pattern: 'storage',
    items: [
      'def gives a block of code a name',
      'order and catalogue are parameters: names for the arguments',
      'return hands the line total back to the caller',
      'Its names are local: quantity, subtotal, discount',
      'The docstring is the function’s own help text',
      'Folded here: the discount rules from section 2',
    ],
  },
)
