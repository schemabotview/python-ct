import type { SceneModel } from '@graphlearning/graphl-flow'
import { landscape } from './landscape'
import { history } from './history'
import { zen } from './zen'
import { strengths } from './strengths'
import { runPipeline } from './run-pipeline'
import { bytecode } from './bytecode'
import { vm } from './vm'
import { callStack } from './stack'
import { heap } from './heap'
import { refs } from './refs'

// Course 1 — the picture. §5 uses the shared pipeline map (registered in ../index.ts).
export const pictureScenes: Record<string, SceneModel> = {
  'picture-landscape': landscape,
  'picture-history': history,
  'picture-zen': zen,
  'picture-strengths': strengths,
  'picture-run': runPipeline,
  'picture-bytecode': bytecode,
  'picture-vm': vm,
  'picture-stack': callStack,
  'picture-heap': heap,
  'picture-refs': refs,
}
