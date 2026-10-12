import type { Scene } from '@graphlearning/flow'
import { programPipeline } from './program-pipeline'
import { replVsScript } from './repl-vs-script'
import { namesToObjects } from './names-to-objects'
import { arithmeticTable } from './arithmetic-table'
import { orderRun } from './order-run'
import { errorKinds } from './error-kinds'

// One bundle per course folder, spread into src/scenes/index.ts.
export const foundationsScenes: Scene[] = [
  programPipeline,
  replVsScript,
  namesToObjects,
  arithmeticTable,
  orderRun,
  errorKinds,
]
