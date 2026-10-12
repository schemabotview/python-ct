import type { Course } from '../types'
import { concurrencyParallelismAndWorkloads } from './01-concurrency-parallelism-and-workloads'
import { threadsAndSharedMemory } from './02-threads-and-shared-memory'
import { processesIsolationAndSerialization } from './03-processes-isolation-and-serialization'
import { executorsAndFutures } from './04-executors-and-futures'
import { coroutinesAndAsyncAwait } from './05-coroutines-and-async-await'
import { taskGroupsTimeoutsAndCancellation } from './06-task-groups-timeouts-and-cancellation'
import { racesSynchronizationAndBackpressure } from './07-races-synchronization-and-backpressure'
import { gilFreeThreadingAndExtensions } from './08-gil-free-threading-and-extensions'

// Chapter 10 — Concurrency and Execution Trade-offs.
export const concurrency: Course = {
  id: 'concurrency',
  title: 'Concurrency and Execution Trade-offs',
  sections: [
    concurrencyParallelismAndWorkloads,
    threadsAndSharedMemory,
    processesIsolationAndSerialization,
    executorsAndFutures,
    coroutinesAndAsyncAwait,
    taskGroupsTimeoutsAndCancellation,
    racesSynchronizationAndBackpressure,
    gilFreeThreadingAndExtensions,
  ],
}
