import type { Scene } from '@graphlearning/flow'
import { pathParts } from './path-parts'
import { encodings } from './encodings'
import { fileModes } from './file-modes'
import { withCleanup } from './with-cleanup'
import { csvJson } from './csv-json'
import { exceptionFlow } from './exception-flow'
import { chaining } from './chaining'
import { validation } from './validation'
import { timeAndMoney } from './time-and-money'
import { importReport } from './import-report'

// One bundle per course folder, spread into src/scenes/index.ts.
export const filesErrorsScenes: Scene[] = [
  pathParts,
  encodings,
  fileModes,
  withCleanup,
  csvJson,
  exceptionFlow,
  chaining,
  validation,
  timeAndMoney,
  importReport,
]
