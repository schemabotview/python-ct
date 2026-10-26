import type { SceneModel } from '@graphlearning/graphl-flow'
import { modelClasses } from './classes'
import { modelDataclasses } from './dataclasses'
import { modelProperties } from './properties'
import { modelMoney } from './money'
import { modelContainers } from './containers'
import { modelInheritance } from './inheritance'
import { modelPolymorphism } from './polymorphism'
import { modelProtocols } from './protocols'
import { modelContextManagers } from './context-managers'
import { modelComposition } from './composition'

export const modelScenes: Record<string, SceneModel> = {
  'model-classes': modelClasses,
  'model-dataclasses': modelDataclasses,
  'model-properties': modelProperties,
  'model-money': modelMoney,
  'model-containers': modelContainers,
  'model-inheritance': modelInheritance,
  'model-polymorphism': modelPolymorphism,
  'model-protocols': modelProtocols,
  'model-context-managers': modelContextManagers,
  'model-composition': modelComposition,
}
