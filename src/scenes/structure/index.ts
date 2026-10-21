import type { Scene } from '@graphlearning/flow'
import { modules } from './modules'
import { packages } from './packages'
import { nameMain } from './name-main'
import { classes } from './classes'
import { dataclassesScene } from './dataclasses'
import { properties } from './properties'
import { dataModel } from './data-model'
import { typeHints } from './type-hints'
import { dependencies } from './dependencies'

export const structureScenes: Scene[] = [
  modules, packages, nameMain, classes, dataclassesScene, properties, dataModel, typeHints, dependencies,
]
