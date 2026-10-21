import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { HOLD_TREE } from './tree'
import main from '../../../spine/hold/01-names/project/main.py?raw'
import session from '../../../spine/hold/01-names/session.txt?raw'

export const namesAndObjects: Scene = ideFrame(
  'hold-names',
  'roastery-etl',
  HOLD_TREE,
  { file: 'main.py', code: main, highlight: [3, 4, 5, 9, 11], terminal: session },
  {
    id: 'hold-names-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'hold-names-model',
        label: 'After line 11',
        sub: 'each name on the left refers to one object on the right',
        pattern: 'network',
        icon: 'none',
        flow: 'LR',
        children: [
          { id: 'n-sku', label: 'sku', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'n-quantity', label: 'quantity', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'n-bag', label: 'bag_price', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'n-price', label: 'price', variant: 'chip', pattern: 'network', icon: 'none' },
          { id: 'o-sku', label: "'ETH-250' · str", variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 'o-quantity', label: '2 · int', variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 'o-bag', label: '9.95 · float', variant: 'chip', pattern: 'storage', icon: 'none' },
          { id: 'o-price', label: '10.95 · float', variant: 'chip', pattern: 'storage', icon: 'none' },
        ],
        edges: [
          { source: 'n-sku', target: 'o-sku' },
          { source: 'n-quantity', target: 'o-quantity' },
          { source: 'n-bag', target: 'o-bag' },
          { source: 'n-price', target: 'o-price' },
        ],
      },
      {
        id: 'hold-names-facts',
        kind: 'list',
        pills: true,
        icon: 'tag',
        label: 'A name is a label, not a box',
        pattern: 'network',
        items: [
          'Assignment binds a name to an object',
          'The object carries the type, not the name',
          'bag_price = price: a second name, same object',
          'price = 10.95 moves price to a new object',
          'bag_price still refers to 9.95',
        ],
      },
    ],
  },
)
