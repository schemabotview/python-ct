import type { Scene, SceneNode } from '@graphlearning/flow'

// The terminal pane is the real output of `python -c "import this"` (CPython 3.14.6).
const ZEN = [
  '$ python -c "import this"',
  "The Zen of Python, by Tim Peters",
  "",
  "Beautiful is better than ugly.",
  "Explicit is better than implicit.",
  "Simple is better than complex.",
  "Complex is better than complicated.",
  "Flat is better than nested.",
  "Sparse is better than dense.",
  "Readability counts.",
  "Special cases aren't special enough to break the rules.",
  "Although practicality beats purity.",
  "Errors should never pass silently.",
  "Unless explicitly silenced.",
  "In the face of ambiguity, refuse the temptation to guess.",
  "There should be one-- and preferably only one --obvious way to do it.",
  "Although that way may not be obvious at first unless you're Dutch.",
  "Now is better than never.",
  "Although never is often better than *right* now.",
  "If the implementation is hard to explain, it's a bad idea.",
  "If the implementation is easy to explain, it may be a good idea.",
  "Namespaces are one honking great idea -- let's do more of those!",
].join('\n')

const chip = (id: string, label: string): SceneNode => ({ id, label, variant: 'chip', pattern: 'storage', icon: 'none' })

export const philosophy: Scene = {
  id: 'python-zen',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    { id: 'zen', kind: 'terminal', filename: 'Terminal', label: ZEN },
    {
      id: 'ideas', framed: true,
      label: 'Three ideas',
      bare: true,
      children: [
        {
          id: 'readability',
          label: 'Readability counts',
          sub: 'indentation is the structure — what you see is what runs',
          pattern: 'network',
          icon: 'none',
          children: [
            {
              id: 'indent',
              kind: 'code',
              filename: 'big_orders.py',
              minCols: 44,
              label: ['totals = [120, 45, 300]', 'for total in totals:', '    if total > 100:', '        print("big order:", total)'].join('\n'),
            },
          ],
        },
        {
          id: 'batteries',
          label: 'Batteries included',
          sub: 'the standard library ships with every Python',
          pattern: 'storage',
          icon: 'none',
          cols: 4,
          children: [
            chip('csv', 'csv'), chip('json', 'json'), chip('sqlite3', 'sqlite3'), chip('pathlib', 'pathlib'),
            chip('datetime', 'datetime'), chip('decimal', 'decimal'), chip('statistics', 'statistics'), chip('logging', 'logging'),
          ],
        },
        {
          id: 'community',
          kind: 'list',
          icon: 'scale',
          label: 'Decided in the open',
          pattern: 'user',
          items: [
            'Every change is a PEP — a Python Enhancement Proposal',
            'An elected Steering Council accepts or rejects them',
            'PyPI holds hundreds of thousands of third-party packages',
          ],
        },
      ],
    },
  ],
  edges: [],
}
