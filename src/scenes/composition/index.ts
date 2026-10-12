import type { Scene } from '@graphlearning/flow'
import { callables } from './callables'
import { closureLateBinding } from './closure-late-binding'
import { decoratorExpansion } from './decorator-expansion'
import { functoolsTools } from './functools-tools'
import { typingVsRuntime } from './typing-vs-runtime'
import { dispatchChoices } from './dispatch-choices'

// One bundle per course folder, spread into src/scenes/index.ts.
export const compositionScenes: Scene[] = [
  callables,
  closureLateBinding,
  decoratorExpansion,
  functoolsTools,
  typingVsRuntime,
  dispatchChoices,
]
