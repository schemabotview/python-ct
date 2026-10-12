import type { Scene } from '@graphlearning/flow'
import { callTrace } from './call-trace'
import { argumentKinds } from './argument-kinds'
import { defaultsVariadics } from './defaults-variadics'
import { callBinding } from './call-binding'
import { scopeLookup } from './scope-lookup'
import { purity } from './purity'
import { contracts } from './contracts'
import { recursionTree } from './recursion-tree'
import { decomposition } from './decomposition'

// One bundle per course folder, spread into src/scenes/index.ts.
export const functionsScenes: Scene[] = [
  callTrace,
  argumentKinds,
  defaultsVariadics,
  callBinding,
  scopeLookup,
  purity,
  contracts,
  recursionTree,
  decomposition,
]
