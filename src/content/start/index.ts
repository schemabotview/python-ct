import type { Course } from '../types'
import { theFinishedProject } from './01-the-finished-project'
import { aNewProject } from './02-a-new-project'
import { firstMainPy } from './03-first-main-py'
import { theRepl } from './04-the-repl'
import { whenTheFirstRunFails } from './05-when-the-first-run-fails'

export const start: Course = {
  id: 'start',
  title: 'Start the project',
  sections: [theFinishedProject, aNewProject, firstMainPy, theRepl, whenTheFirstRunFails],
}
