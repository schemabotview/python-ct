import type { Scene } from '@graphlearning/flow'
import { projectTour } from './tour'
import { newProject } from './new-project'
import { firstMain } from './main-py'
import { replBeside } from './repl'
import { syntaxError } from './syntax-error'
import { nameError } from './name-error'

export const startScenes: Scene[] = [projectTour, newProject, firstMain, replBeside, syntaxError, nameError]
