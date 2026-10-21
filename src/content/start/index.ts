import type { Course } from '../types'
import { theFinishedProject } from './01-the-finished-project'
import { aNewProject } from './02-a-new-project'
import { firstMainPy } from './03-first-main-py'
import { theRepl } from './04-the-repl'
import { aSyntaxError } from './05-a-syntax-error'
import { aNameError } from './06-a-name-error'

export const start: Course = {
  id: 'start',
  title: 'Start the project',
  sections: [theFinishedProject, aNewProject, firstMainPy, theRepl, aSyntaxError, aNameError],
}
