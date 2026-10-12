import type { Scene } from '@graphlearning/flow'

// §8 — sorting with and without a key, and the summarising built-ins. `key=` is previewed with
// functions that already exist (len, str.lower); defining one waits for the functions chapter.
export const sortBuiltins: Scene = {
  id: 'sort-builtins',
  title: 'Sorting and summarising',
  flow: 'TB',
  nodes: [
    {
      id: 'sorting',
      kind: 'code',
      filename: 'sorting.py',
      label: `prices = [4.5, 8.0, 2.25]
sorted(prices)                # [2.25, 4.5, 8.0]
sorted(prices, reverse=True)  # [8.0, 4.5, 2.25]

words = ["pear", "fig", "apple", "kiwi"]
sorted(words)                 # ['apple', 'fig', 'kiwi', 'pear']
sorted(words, key=len)        # ['fig', 'pear', 'kiwi', 'apple']

names = ["b", "A", "c", "B"]
sorted(names)                 # ['A', 'B', 'b', 'c']
sorted(names, key=str.lower)  # ['A', 'b', 'B', 'c']`,
    },
    {
      id: 'summary',
      kind: 'table',
      label: 'Summarising prices = [4.5, 8.0, 2.25]',
      headers: ['Expression', 'Result'],
      values: [
        ['len(prices)', '3'],
        ['sum(prices)', '14.75'],
        ['min(prices)', '2.25'],
        ['max(prices)', '8.0'],
        ['list(reversed(prices))', '[2.25, 8.0, 4.5]'],
      ],
    },
  ],
  edges: [{ source: 'sorting', target: 'summary' }],
}
