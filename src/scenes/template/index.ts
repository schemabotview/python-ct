import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame } from '../ide'
import { mapPane } from '../map'
import main1 from '../../../spine/template/01-main/project/main.py?raw'
import session1 from '../../../spine/template/01-main/session.txt?raw'
import main2 from '../../../spine/template/02-catalogue/project/main.py?raw'
import session2 from '../../../spine/template/02-catalogue/session.txt?raw'

// TEMPORARY — the infra step's template frames, one per kind of side pane, so the template, the map
// and the checks have something real to render before Course 2 (the pilot) exists. Deleted, with
// src/content/template and spine/template, when the pilot lands.

// Two names, one dict — before and after a change made through one of them. The values are the
// session's: `alias is order` and the dict `order` prints after `alias["quantity"] = 6`.
const dictState = (key: string, title: string, names: string[], quantity: number, changed: boolean): SceneModel['nodes'][number] => ({
  type: 'group', id: `${key}`, title, icon: 'memory', tone: changed ? 'store' : 'ingest', dir: 'row', children: [
    { type: 'table', id: `${key}-names`, title: 'names', rows: names.map((n) => [n, '●']) },
    { type: 'table', id: `${key}-dict`, title: 'dict', rows: [['"sku"', '"ETH-250"'], { cells: ['"quantity"', quantity], tone: changed ? 'store' : undefined }] },
  ],
})

const memory: SceneModel = ideFrame({
  tree: [{ name: 'main.py', state: 'active' }],
  editor: { file: 'main.py', code: main2, highlight: [10, 11] },
  session: session2,
  side: [
    dictState('first', 'After line 10: one name, one dict', ['order'], 3, false),
    dictState('before', 'After line 11: alias = order', ['order', 'alias'], 3, false),
    dictState('after', 'After alias["quantity"] = 6', ['order', 'alias'], 6, true),
    {
      type: 'table', id: 'mem-checks', title: 'Asked in the REPL', tone: 'ingest', columns: ['typed', 'Python answers'], rows: [
        { cells: ['alias is order', 'True'] },
        { cells: ['order', "{'sku': 'ETH-250', 'quantity': 6}"], tone: 'store' },
      ],
    },
    { type: 'item', id: 'mem-remember', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a name points at an object', 'two names can point at one object'] },
    { type: 'note', id: 'mem-note', tone: 'ingest', text: 'Assignment binds a name; it never copies. alias and order are one dict, so a change made through either name is seen through both.' },
  ],
  edges: [
    { from: 'first-names.order', to: 'first-dict' },
    { from: 'before-names.order', to: 'before-dict' },
    { from: 'before-names.alias', to: 'before-dict' },
    { from: 'after-names.order', to: 'after-dict' },
    { from: 'after-names.alias', to: 'after-dict' },
  ],
})

const plot: SceneModel = ideFrame({
  tree: [{ name: 'main.py', state: 'active' }],
  editor: { file: 'main.py', code: main1, highlight: [6, 7, 8] },
  session: session1,
  side: [
    {
      type: 'plot', id: 'line-total', tone: 'store', compact: true, title: 'A line total grows with the bags', x: { min: 0, max: 6, step: 1, label: 'bags' }, y: { min: 0, max: 60, step: 10, label: '$' },
      series: [{ kind: 'line', points: [0, 1, 2, 3, 4, 5, 6].map((q): [number, number] => [q, +(9.95 * q).toFixed(2)]), label: 'ETH-250' }],
    },
    {
      type: 'table', id: 'line-rows', title: 'price × quantity, as Decimal', tone: 'store', columns: ['bags', 'total', 'as a float'],
      rows: [['1', '9.95', '9.95'], ['2', '19.90', '19.9'], ['3', '29.85', '29.849999999999998'], ['6', '59.70', '59.699999999999996']],
    },
    { type: 'note', id: 'line-note', tone: 'store', text: 'A Decimal keeps the cents the shop wrote down; a float keeps the nearest binary fraction.' },
  ],
})

const pane = mapPane('transform')
const mapSide: SceneModel = ideFrame({
  tree: [{ name: 'main.py', state: 'active' }],
  editor: { file: 'main.py', code: main1, highlight: [8] },
  session: session1,
  side: [
    {
      type: 'group', id: 'map-side', bare: true, dir: 'row', children: [
        pane.node,
        {
          type: 'group', id: 'flow', title: 'One line, priced', tone: 'store', children: [
            {
              type: 'group', id: 'f-inputs', bare: true, dir: 'row', children: [
                { type: 'item', id: 'f-price', title: 'price', sub: 'Decimal("9.95")', icon: 'card', stack: true },
                { type: 'item', id: 'f-qty', title: 'quantity', sub: '3 bags', icon: 'boxes', stack: true },
              ],
            },
            { type: 'item', id: 'f-total', title: 'price * quantity', sub: 'Decimal("29.85")', icon: 'zap', stack: true },
            {
              type: 'table', id: 'f-types', title: 'what each value is', columns: ['name', 'type', 'value'],
              rows: [['price', 'Decimal', '9.95'], ['quantity', 'int', '3'], { id: 'total', cells: ['the total', 'Decimal', '29.85'], tone: 'store' }],
            },
            {
              type: 'table', id: 'f-float', title: 'the same line with a float price', columns: ['typed', 'Python answers'],
              rows: [['9.95 * 3', '29.849999999999998'], { cells: ['Decimal("9.95") * 3', 'Decimal(\'29.85\')'], tone: 'store' }],
            },
            { type: 'note', id: 'f-note', text: 'The transform stage starts here: one price times one quantity, still a Decimal.' },
          ],
        },
      ],
    },
  ],
  edges: [...pane.edges, { from: 'f-price', to: 'f-total' }, { from: 'f-qty', to: 'f-total' }],
})

export const templateScenes: Record<string, SceneModel> = {
  'template-memory': memory,
  'template-plot': plot,
  'template-map-pane': mapSide,
}
