import type { Scene } from '@graphlearning/flow'
import { stringSequence } from './string-sequence'
import { listOperations } from './list-operations'
import { tupleVsList } from './tuple-vs-list'
import { dictLookups } from './dict-lookups'
import { setOperations } from './set-operations'
import { aliasingDiagram } from './aliasing-diagram'
import { unpackNested } from './unpack-nested'
import { sortBuiltins } from './sort-builtins'
import { comprehensionPreview } from './comprehension-preview'

// One bundle per course folder, spread into src/scenes/index.ts.
export const collectionsScenes: Scene[] = [
  stringSequence,
  listOperations,
  tupleVsList,
  dictLookups,
  setOperations,
  aliasingDiagram,
  unpackNested,
  sortBuiltins,
  comprehensionPreview,
]
