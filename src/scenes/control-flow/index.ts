import type { Scene } from '@graphlearning/flow'
import { truthAndLogic } from './truth-and-logic'
import { decisionBranches } from './decision-branches'
import { forTrace } from './for-trace'
import { whileTrace } from './while-trace'
import { loopControl } from './loop-control'
import { matchOrder } from './match-order'
import { loopAlgorithms } from './loop-algorithms'

// One bundle per course folder, spread into src/scenes/index.ts.
export const controlFlowScenes: Scene[] = [
  truthAndLogic,
  decisionBranches,
  forTrace,
  whileTrace,
  loopControl,
  matchOrder,
  loopAlgorithms,
]
