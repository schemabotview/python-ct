import type { Course } from '../types'
import { grouping } from './01-grouping'
import { counterAndDefaultdict } from './02-counter-and-defaultdict'
import { sorting } from './03-sorting'
import { mathAndStatistics } from './04-math-and-statistics'
import { datesAndTimes } from './05-dates-and-times'
import { itertoolsSection } from './06-itertools'
import { theTransformStep } from './07-the-transform-step'

export const transformCourse: Course = {
  id: 'transform',
  title: 'Transform and aggregate',
  sections: [grouping, counterAndDefaultdict, sorting, mathAndStatistics, datesAndTimes, itertoolsSection, theTransformStep],
}
