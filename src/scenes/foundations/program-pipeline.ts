import type { Scene } from '@graphlearning/flow'

// §1 — the order-total idea carried through every stage: the plain-words algorithm, the Python that
// writes it down, the interpreter that runs it, and what appears on screen. Each stage shows the
// real content rather than a label for it, so the pipeline and the running example are one picture.
export const programPipeline: Scene = {
  id: 'program-pipeline',
  title: 'From algorithm to result',
  flow: 'TB',
  nodes: [
    {
      id: 'algorithm',
      kind: 'list',
      label: 'Algorithm',
      items: ['Take the price of one item', 'Multiply it by the quantity ordered', 'Show the total'],
      framed: true,
    },
    {
      id: 'source',
      kind: 'code',
      filename: 'order.py  —  source code',
      label: `price = 4.5
quantity = 3
print(price * quantity)`,
    },
    {
      id: 'run',
      label: 'Run',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'interpreter', label: 'Interpreter', sub: 'runs each statement', pattern: 'service', icon: 'cpu' },
        { id: 'result', label: '13.5', sub: 'printed on the screen', pattern: 'external', icon: 'monitor' },
      ],
      edges: [{ source: 'interpreter', target: 'result', label: 'produces' }],
    },
  ],
  edges: [
    { source: 'algorithm', target: 'source', label: 'written down in Python', dashed: true },
    { source: 'source', target: 'run', label: 'read by the interpreter' },
  ],
}
