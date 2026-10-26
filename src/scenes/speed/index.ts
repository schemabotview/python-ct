import type { SceneModel } from '@graphlearning/graphl-flow'
import { speedMeasureFirst } from './measure-first'
import { speedDataStructures } from './data-structures'
import { speedMemory } from './memory'
import { speedCpuOrIo } from './cpu-or-io'
import { speedThreads } from './threads'
import { speedProcesses } from './processes'
import { speedAsyncio } from './asyncio'

export const speedScenes: Record<string, SceneModel> = {
  'speed-measure-first': speedMeasureFirst,
  'speed-data-structures': speedDataStructures,
  'speed-memory': speedMemory,
  'speed-cpu-or-io': speedCpuOrIo,
  'speed-threads': speedThreads,
  'speed-processes': speedProcesses,
  'speed-asyncio': speedAsyncio,
}
