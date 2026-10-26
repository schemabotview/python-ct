import type { SceneModel } from '@graphlearning/graphl-flow'
import { processExpressions } from './expressions'
import { processDecisions } from './decisions'
import { processMatch } from './match'
import { processFor } from './for'
import { processWhile } from './while'
import { processComprehensions } from './comprehensions'
import { processFunctions } from './functions'
import { processArguments } from './arguments'
import { processScope } from './scope'
import { processExceptions } from './exceptions'
import { processRaising } from './raising'

export const processScenes: Record<string, SceneModel> = {
  'process-expressions': processExpressions,
  'process-decisions': processDecisions,
  'process-match': processMatch,
  'process-for': processFor,
  'process-while': processWhile,
  'process-comprehensions': processComprehensions,
  'process-functions': processFunctions,
  'process-arguments': processArguments,
  'process-scope': processScope,
  'process-exceptions': processExceptions,
  'process-raising': processRaising,
}
