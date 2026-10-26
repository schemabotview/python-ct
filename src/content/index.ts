import { picture } from './picture'
import { start } from './start'
import { hold } from './hold'
import { processCourse } from './process'
import { extractCourse } from './extract'
import { transformCourse } from './transform'
import { loadCourse } from './load'
import { structureCourse } from './structure'
import { modelCourse } from './model'
import { trustCourse } from './trust'
import type { Course, Section } from './types'

// Course registry, in syllabus order. One course per chapter of PYTHON-COURSE-PLAN.md; a course is
// registered here only once it is authored.
export const COURSES: Record<string, Course> = {
  [picture.id]: picture,
  [start.id]: start,
  [hold.id]: hold,
  [processCourse.id]: processCourse,
  [extractCourse.id]: extractCourse,
  [transformCourse.id]: transformCourse,
  [loadCourse.id]: loadCourse,
  [structureCourse.id]: structureCourse,
  [modelCourse.id]: modelCourse,
  [trustCourse.id]: trustCourse,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
