import type { SceneModel } from '@graphlearning/graphl-flow'
import { holdNames } from './names'
import { holdDecimal } from './decimal'
import { holdStrings } from './strings'
import { holdNone } from './none'
import { holdLists } from './lists'
import { holdTuples } from './tuples'
import { holdDicts } from './dicts'
import { holdSets } from './sets'
import { holdNesting } from './nesting'

export const holdScenes: Record<string, SceneModel> = {
  'hold-names': holdNames,
  'hold-decimal': holdDecimal,
  'hold-strings': holdStrings,
  'hold-none': holdNone,
  'hold-lists': holdLists,
  'hold-tuples': holdTuples,
  'hold-dicts': holdDicts,
  'hold-sets': holdSets,
  'hold-nesting': holdNesting,
}
