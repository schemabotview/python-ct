import type { Scene } from '@graphlearning/flow'
import { projectTour } from './tour'
import { newProject } from './new-project'
import { firstMain } from './main-py'
import { replBeside } from './repl'
import { firstErrors } from './first-errors'

export const startScenes: Scene[] = [projectTour, newProject, firstMain, replBeside, firstErrors]
