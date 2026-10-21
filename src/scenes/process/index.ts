import type { Scene } from '@graphlearning/flow'
import { expressions } from './expressions'
import { decisions } from './decisions'
import { matchRows } from './match'
import { forLoops } from './for-loops'
import { whileLoops } from './while-loops'
import { comprehensions } from './comprehensions'
import { functions } from './functions'
import { argumentsScene as args } from './arguments'
import { scope } from './scope'
import { exceptions } from './exceptions'
import { raising } from './raising'

export const processScenes: Scene[] = [
  expressions, decisions, matchRows, forLoops, whileLoops, comprehensions, functions, args, scope, exceptions, raising,
]
