import type { Course } from '../types'
import { aVenv } from './01-a-venv'
import { mainPy } from './02-main-py'
import { theRepl } from './03-the-repl'
import { aSyntaxError } from './04-a-syntax-error'
import { aNameError } from './05-a-name-error'

export const start: Course = {
  id: 'start',
  title: 'Start the project',
  sections: [aVenv, mainPy, theRepl, aSyntaxError, aNameError],
}
