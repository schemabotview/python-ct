import type { Scene, SceneNode } from '@graphlearning/flow'

// The CSV is the real first day of spine/extract (data/raw/orders-2026-10-01.csv); the report table is what
// Course 8's pipeline computes for that day on CPython 3.14.6: two rows rejected, the rest priced with
// Course 5's discounts.
const ORDERS = [
  'order_id,date,customer,sku,quantity',
  'ORD-1001,2026-10-01,maya,ETH-250,3',
  'ORD-1002,2026-10-01,omar,COL-500,12',
  'ORD-1003,2026-10-01,lena,KEN-1000,2',
  'ORD-1004,2026-10-01,raj,ETH-250,three',
  'ORD-1005,2026-10-01,maya,PER-250,1',
  'ORD-1006,2026-10-01,"Luna Café, Ltd",BRA-500,4',
].join('\n')

const step = (id: string, label: string, sub: string, icon: string, pattern: SceneNode['pattern']): SceneNode => ({ id, label, sub, icon, pattern })
const stage = (id: string, badge: string, label: string, sub: string, pattern: SceneNode['pattern'], children: SceneNode[]): SceneNode =>
  ({ id, badge, label, sub, pattern, icon: 'none', cols: 2, children })
const course = (id: string, label: string): SceneNode => ({ id, label, variant: 'chip', pattern: 'user', icon: 'none' })

export const pipeline: Scene = {
  id: 'roastery-etl',
  padding: 0.04,
  header: 'band',
  nodes: [
    {
      id: 'flow',
      label: 'The pipeline',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        { id: 'raw', kind: 'code', filename: 'data/raw/orders-2026-10-01.csv', hug: true, pattern: 'warn', highlight: [5, 6], label: ORDERS },
        {
          id: 'stages',
          label: 'Stages',
          bare: true,
          children: [
            stage('extract', '6', 'Extract', 'read the files, check every row', 'network', [
              step('read', 'Read each day', 'one CSV per day', 'file', 'network'),
              step('validate', 'Validate rows', 'keep the good, report the bad', 'ban', 'network'),
            ]),
            stage('transform', '5 · 7', 'Transform', 'price and aggregate', 'service', [
              step('price', 'Price each line', 'catalogue price × quantity', 'receipt', 'service'),
              step('aggregate', 'Revenue per product', 'grouped and sorted', 'sigma', 'service'),
            ]),
            stage('load', '8', 'Load', 'write the results', 'storage', [
              step('db', 'SQLite database', 'every priced line', 'database', 'storage'),
              step('csv', 'Daily report', 'one row per day', 'file', 'storage'),
            ]),
          ],
          edges: [
            { source: 'extract', target: 'transform' },
            { source: 'transform', target: 'load' },
          ],
        },
        {
          id: 'out',
          label: 'Results',
          bare: true,
          children: [
            {
              id: 'report',
              kind: 'table',
              label: 'October 1st, per product',
              headers: ['sku', 'bags', 'revenue'],
              values: [
                ['ETH-250', '3', '29.85'],
                ['COL-500', '12', '178.50'],
                ['KEN-1000', '2', '58.90'],
                ['BRA-500', '4', '61.75'],
                ['total', '21', '329.00'],
              ],
            },
            { id: 'rejected', kind: 'note', pattern: 'warn', label: 'Rejected, with reasons: ORD-1004, quantity "three"; ORD-1005, unknown product PER-250' },
          ],
        },
      ],
      edges: [
        { source: 'raw', target: 'extract' },
        { source: 'load', target: 'report' },
      ],
    },
    {
      id: 'around',
      label: 'Around the pipeline',
      sub: 'the courses that make it run, then make it real',
      pattern: 'user',
      icon: 'none',
      span: 'all',
      cols: 7,
      children: [
        course('c2', '2 · How Python runs'),
        course('c3', '3 · Start the project'),
        course('c4', '4 · Hold the data'),
        course('c9', '9 · Structure it'),
        course('c10', '10 · Make it trustworthy'),
        course('c11', '11 · Make it fast'),
        course('c12', '12 · Ship it'),
      ],
    },
  ],
  edges: [],
}
