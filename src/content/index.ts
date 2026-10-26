import { picture } from './picture'
import { start } from './start'
import { hold } from './hold'
import { processCourse } from './process'
import { extractCourse } from './extract'
import type { Course, Section } from './types'

// Course registry, in syllabus order. One course per chapter of PYTHON-COURSE-PLAN.md; a course is
// registered here only once it is authored.
export const COURSES: Record<string, Course> = {
  [picture.id]: picture,
  [start.id]: start,
  [hold.id]: hold,
  [processCourse.id]: processCourse,
  [extractCourse.id]: extractCourse,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
