import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { day, extractTree } from './tree'
import main from '../../../spine/extract/05-json/project/main.py?raw'
import session from '../../../spine/extract/05-json/session.txt?raw'

export const jsonCatalogue: Scene = ideFrame(
  'extract-json',
  'roastery-etl',
  extractTree([day(1), day(2), day(3)]),
  { file: 'main.py', code: main, highlight: [9, 13, 15, 16], terminal: session },
  {
    id: 'extract-json-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'json-types',
        kind: 'table',
        label: 'JSON becomes Python',
        headers: ['JSON', 'Python'],
        values: [
          ['object { }', 'dict'],
          ['array [ ]', 'list'],
          ['string', 'str'],
          ['number', 'int or float'],
          ['true / false / null', 'True / False / None'],
        ],
      },
      {
        id: 'extract-json-facts',
        kind: 'list',
        icon: 'braces',
        label: 'Prices stay exact',
        pattern: 'storage',
        items: [
          'The catalogue stores prices as strings: "9.95"',
          'Decimal("9.95") is exact; 9.95 as a float is not',
          'parse_float=Decimal does the same for JSON numbers',
        ],
      },
    ],
  },
)
