import type { Scene } from '@graphlearning/flow'
import { workloadKinds } from './workload-kinds'
import { threadRace } from './thread-race'
import { processBoundary } from './process-boundary'
import { futuresFlow } from './futures-flow'
import { asyncTimeline } from './async-timeline'
import { cancellation } from './cancellation'
import { boundedWork } from './bounded-work'
import { runtimeMatrix } from './runtime-matrix'

// One bundle per course folder, spread into src/scenes/index.ts.
export const concurrencyScenes: Scene[] = [
  workloadKinds,
  threadRace,
  processBoundary,
  futuresFlow,
  asyncTimeline,
  cancellation,
  boundedWork,
  runtimeMatrix,
]
