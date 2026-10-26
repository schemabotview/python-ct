import type { SceneModel } from '@graphlearning/graphl-flow'
import { structureModules } from './modules'
import { structurePackages } from './packages'
import { structureMainGuard } from './main-guard'
import { structureTypeHints } from './type-hints'
import { structureMypy } from './mypy'

export const structureScenes: Record<string, SceneModel> = {
  'structure-modules': structureModules,
  'structure-packages': structurePackages,
  'structure-main-guard': structureMainGuard,
  'structure-type-hints': structureTypeHints,
  'structure-mypy': structureMypy,
}
