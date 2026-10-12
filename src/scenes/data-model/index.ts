import type { Scene } from '@graphlearning/flow'
import { iteratorProtocol } from './iterator-protocol'
import { generatorTrace } from './generator-trace'
import { lazyPipeline } from './lazy-pipeline'
import { contextManagers } from './context-managers'
import { hashContract } from './hash-contract'
import { reprTruth } from './repr-truth'
import { containerOperators } from './container-operators'
import { propertyAccess } from './property-access'
import { lifetime } from './lifetime'

// One bundle per course folder, spread into src/scenes/index.ts.
export const dataModelScenes: Scene[] = [
  iteratorProtocol,
  generatorTrace,
  lazyPipeline,
  contextManagers,
  hashContract,
  reprTruth,
  containerOperators,
  propertyAccess,
  lifetime,
]
