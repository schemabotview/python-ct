import type { Scene } from '@graphlearning/flow'

// §2 — a list changing in place, and the table that answers the question beginners get wrong:
// which operations change the list, and what each one hands back.
export const listOperations: Scene = {
  id: 'list-operations',
  title: 'A list changes in place',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'code',
      filename: 'lists.py',
      label: `items = ["tea", "mug", "tea"]
items.append("jar")     # ['tea', 'mug', 'tea', 'jar']
items[1] = "cup"        # ['tea', 'cup', 'tea', 'jar']
items.pop()             # 'jar'
items.insert(0, "box")  # ['box', 'tea', 'cup', 'tea']
items.count("tea")      # 2
items.index("cup")      # 2
items[1:3]              # ['tea', 'cup']`,
    },
    {
      id: 'methods',
      kind: 'table',
      label: 'What each operation does',
      headers: ['Operation', 'Changes list?', 'Returns'],
      values: [
        ['append(x)', 'yes', 'None'],
        ['insert(i, x)', 'yes', 'None'],
        ['pop()', 'yes', 'the removed item'],
        ['remove(x)', 'yes', 'None'],
        ['sort()', 'yes', 'None'],
        ['sorted(items)', 'no', 'a new list'],
      ],
    },
  ],
  edges: [{ source: 'trace', target: 'methods', label: 'in place, and what comes back' }],
}
