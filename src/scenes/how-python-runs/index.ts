import type { Scene } from '@graphlearning/flow'
import { runPipeline } from './pipeline'
import { bytecodeCache } from './cache'
import { stackMachine } from './vm'
import { callStack } from './callstack'
import { namesObjects } from './names'
import { objectsHeap } from './identity'
import { refcountGc } from './refcount'
import { theGil } from './gil'
import { readingTraceback } from './traceback'

export const howPythonRunsScenes: Scene[] = [
  runPipeline, bytecodeCache, stackMachine, callStack, namesObjects, objectsHeap, refcountGc, theGil, readingTraceback,
]
