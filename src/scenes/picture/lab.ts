import type { TreeEntry } from '@graphlearning/graphl-flow'

// Course 1's labs sit in a folder of their own: the project does not exist until Course 2.
export const PROJECT = 'picture'
export const files = (names: string[], active: string, extra: TreeEntry[] = []): TreeEntry[] =>
  [...extra, ...names.map((name): TreeEntry => ({ name, state: name === active ? 'active' : undefined }))]
