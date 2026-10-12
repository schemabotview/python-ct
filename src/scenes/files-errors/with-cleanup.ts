import type { Scene } from '@graphlearning/flow'

// §4 — a with block closing its file on success and on failure, with the same facts drawn as the
// sequence of events. Compact chips keep the diagram narrow so the code stays readable.
export const withCleanup: Scene = {
  id: 'with-cleanup',
  title: 'with closes the file either way',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'with.py',
      label: `with open("orders.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
f.closed                   # True: closed on leaving the block

try:
    with open("orders.txt", encoding="utf-8") as f:
        raise RuntimeError("boom")
except RuntimeError:
    f.closed               # True: closed even though it raised`,
    },
    {
      id: 'events',
      label: 'The guarantee',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'enter', label: 'open the file', variant: 'chip', pattern: 'service', icon: 'folder' },
        { id: 'body', label: 'run the block (it may raise)', variant: 'chip', pattern: 'service', icon: 'workflow' },
        { id: 'closed', label: 'file is closed either way', variant: 'chip', pattern: 'storage', icon: 'lock' },
      ],
      edges: [
        { source: 'enter', target: 'body' },
        { source: 'body', target: 'closed', label: 'finishes normally' },
        { source: 'body', target: 'closed', label: 'or raises an error', dashed: true, route: 'step' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'events' }],
}
