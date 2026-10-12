import type { Scene } from '@graphlearning/flow'

// §2 — the reporting project as an import graph (arrows point from the importer to the imported module),
// and a two-file circular import with the error it produces. The error text is the exact output of this
// Python build; the narration says wording varies between versions.
export const packageGraph: Scene = {
  id: 'package-graph',
  title: 'Who imports whom',
  flow: 'TB',
  nodes: [
    {
      id: 'graph',
      label: 'orders/ package',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'main', label: '__main__.py', variant: 'chip', pattern: 'user', icon: 'terminal' },
        { id: 'cli', label: 'cli.py', variant: 'chip', pattern: 'service', icon: 'filecode' },
        { id: 'calc', label: 'calc.py', variant: 'chip', pattern: 'storage', icon: 'sigma' },
        { id: 'loader', label: 'loader.py', variant: 'chip', pattern: 'storage', icon: 'file' },
      ],
      edges: [
        { source: 'main', target: 'cli', label: 'imports' },
        { source: 'cli', target: 'calc' },
        { source: 'cli', target: 'loader' },
      ],
    },
    {
      id: 'cycle',
      kind: 'code',
      filename: 'a circular import',
      label: `# pricing.py
from inventory import in_stock
# inventory.py
from pricing import price_of     # pricing is still loading
# python -c "import pricing"
# ImportError: cannot import name 'price_of' from 'pricing'`,
    },
  ],
  edges: [{ source: 'graph', target: 'cycle', label: 'when two modules import each other' }],
}
