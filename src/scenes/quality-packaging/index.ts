import type { Scene } from '@graphlearning/flow'
import { unitTests } from './unit-tests'
import { diagnosis } from './diagnosis'
import { loggingFlow } from './logging-flow'
import { profileOutput } from './profile-output'
import { complexityChoices } from './complexity-choices'
import { untrustedInput } from './untrusted-input'
import { cliInterface } from './cli-interface'
import { packageFlow } from './package-flow'

// One bundle per course folder, spread into src/scenes/index.ts.
export const qualityPackagingScenes: Scene[] = [
  unitTests,
  diagnosis,
  loggingFlow,
  profileOutput,
  complexityChoices,
  untrustedInput,
  cliInterface,
  packageFlow,
]
