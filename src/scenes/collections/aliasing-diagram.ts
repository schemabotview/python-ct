import type { Scene } from '@graphlearning/flow'

// §6 — the Chapter 1 name-to-object picture, now with two names on one list and a copy on another.
// Drawn AFTER b.append(4): a and b reach the changed list, c still reaches the untouched copy.
export const aliasingDiagram: Scene = {
  id: 'aliasing-diagram',
  title: 'Two names, one list — and a copy',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'aliasing.py',
      label: `a = [1, 2, 3]
b = a                  # a second name, not a copy
c = a.copy()           # a new list with the same contents
print(a == c, a is c)  # True False
b.append(4)
print(a, c)            # [1, 2, 3, 4] [1, 2, 3]`,
    },
    {
      id: 'diagram',
      label: 'After b.append(4)',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'a', label: 'a', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'b', label: 'b', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'c', label: 'c', variant: 'chip', pattern: 'user', icon: 'tag' },
        { id: 'shared', label: '[1, 2, 3, 4]', sub: 'one list, two names', pattern: 'storage', icon: 'box' },
        { id: 'copy', label: '[1, 2, 3]', sub: 'the separate copy', pattern: 'storage', icon: 'box' },
      ],
      edges: [
        { source: 'a', target: 'shared' },
        { source: 'b', target: 'shared' },
        { source: 'c', target: 'copy' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'diagram' }],
}
