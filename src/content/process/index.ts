import type { Course } from '../types'
import { expressions } from './01-expressions'
import { decisions } from './02-decisions'
import { match } from './03-match'
import { forLoops } from './04-for-loops'
import { whileBreakContinue } from './05-while-break-continue'
import { comprehensions } from './06-comprehensions'
import { functions } from './07-functions'
import { argumentsSection } from './08-arguments'
import { scope } from './09-scope'
import { exceptions } from './10-exceptions'
import { raisingYourOwn } from './11-raising-your-own'

export const processCourse: Course = {
  id: 'process',
  title: 'Process the data',
  sections: [expressions, decisions, match, forLoops, whileBreakContinue, comprehensions, functions, argumentsSection, scope, exceptions, raisingYourOwn],
}
