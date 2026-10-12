import type { Course } from '../types'
import { programsAndTheInterpreter } from './01-programs-and-the-interpreter'
import { interactiveSessionsAndScripts } from './02-interactive-sessions-and-scripts'
import { namesObjectsAndTypes } from './03-names-objects-and-types'
import { expressionsOperatorsAndNumbers } from './04-expressions-operators-and-numbers'
import { textInputAndFormattedOutput } from './05-text-input-and-formatted-output'
import { errorsAndReadingATraceback } from './06-errors-and-reading-a-traceback'

// Chapter 1 — Programs, Values, and Execution.
export const foundations: Course = {
  id: 'foundations',
  title: 'Programs, Values, and Execution',
  sections: [
    programsAndTheInterpreter,
    interactiveSessionsAndScripts,
    namesObjectsAndTypes,
    expressionsOperatorsAndNumbers,
    textInputAndFormattedOutput,
    errorsAndReadingATraceback,
  ],
}
