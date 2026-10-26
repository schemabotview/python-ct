import type { Course } from '../types'
import { pytestSection } from './01-pytest'
import { fixturesAndParametrisation } from './02-fixtures-and-parametrisation'
import { testDoubles } from './03-test-doubles'
import { loggingSection } from './04-logging'
import { decoratorsAndClosures } from './05-decorators-and-closures'
import { debugging } from './06-debugging'
import { lintingAndFormatting } from './07-linting-and-formatting'

export const trustCourse: Course = {
  id: 'trust',
  title: 'Make it trustworthy',
  sections: [pytestSection, fixturesAndParametrisation, testDoubles, loggingSection, decoratorsAndClosures, debugging, lintingAndFormatting],
}
