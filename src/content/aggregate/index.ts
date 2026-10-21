import type { Course } from '../types'
import { groupingWithADict } from './01-grouping-with-a-dict'
import { counterAndDefaultdict } from './02-counter-and-defaultdict'
import { sortingSection } from './03-sorting'
import { mathAndStatistics } from './04-math-and-statistics'
import { datesAndTimes } from './05-dates-and-times'
import { itertoolsSection } from './06-itertools'
import { theTransformStep } from './07-the-transform-step'

export const aggregateCourse: Course = {
  id: 'aggregate',
  title: 'Aggregate it',
  sections: [groupingWithADict, counterAndDefaultdict, sortingSection, mathAndStatistics, datesAndTimes, itertoolsSection, theTransformStep],
}
