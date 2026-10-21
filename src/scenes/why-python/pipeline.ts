import type { Scene, SceneNode } from '@graphlearning/flow'

// The CSV is the sample day the course builds on; the report table is what a real run over it
// printed (CPython 3.13): order 1004's quantity is "three", so it is rejected and the rest is priced.
const ORDERS = [
  'order_id,date,customer,sku,qty',
  '1001,2026-10-01,ana@example.com,ETH-250,2',
  '1002,2026-10-01,ben@example.com,COL-500,1',
  '1003,2026-10-01,ana@example.com,BRA-1K,1',
  '1004,2026-10-01,cara@example.com,ETH-250,three',
  '1005,2026-10-01,ben@example.com,ETH-250,1',
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
        { id: 'raw', kind: 'code', filename: 'data/raw/orders-2026-10-01.csv', hug: true, pattern: 'warn', highlight: [5], label: ORDERS },
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
              step('csv', 'Daily report', 'one row per product', 'file', 'storage'),
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
              label: 'daily_report.csv',
              headers: ['sku', 'bags', 'revenue'],
              values: [
                ['ETH-250', '3', '28.50'],
                ['BRA-1K', '1', '27.00'],
                ['COL-500', '1', '16.00'],
                ['total', '5', '71.50'],
              ],
            },
            { id: 'rejected', kind: 'note', pattern: 'warn', label: 'Rejected: order 1004 — quantity "three" is not a number' },
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
