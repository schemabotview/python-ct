import type { Scene } from '@graphlearning/flow'
import { classAnatomy } from './class-anatomy'
import { sharedAttribute } from './shared-attribute'
import { methodKinds } from './method-kinds'
import { dataclassGenerated } from './dataclass-generated'
import { compositionDiagram } from './composition-diagram'
import { inheritanceChain } from './inheritance-chain'
import { strategies } from './strategies'
import { invariants } from './invariants'

// One bundle per course folder, spread into src/scenes/index.ts.
export const classesScenes: Scene[] = [
  classAnatomy,
  sharedAttribute,
  methodKinds,
  dataclassGenerated,
  compositionDiagram,
  inheritanceChain,
  strategies,
  invariants,
]
