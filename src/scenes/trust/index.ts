import type { SceneModel } from '@graphlearning/graphl-flow'
import { trustPytest } from './pytest'
import { trustFixtures } from './fixtures'
import { trustTestDoubles } from './test-doubles'
import { trustLogging } from './logging'
import { trustDecorators } from './decorators'
import { trustDebugging } from './debugging'
import { trustRuff } from './ruff'

export const trustScenes: Record<string, SceneModel> = {
  'trust-pytest': trustPytest,
  'trust-fixtures': trustFixtures,
  'trust-test-doubles': trustTestDoubles,
  'trust-logging': trustLogging,
  'trust-decorators': trustDecorators,
  'trust-debugging': trustDebugging,
  'trust-ruff': trustRuff,
}
