import { foundations } from './foundations'
import { collections } from './collections'
import { controlFlow } from './control-flow'
import { functions } from './functions'
import { filesErrors } from './files-errors'
import { modules } from './modules'
import { classes } from './classes'
import { dataModel } from './data-model'
import { composition } from './composition'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
// One course per chapter of PYTHON-COURSE-PLAN.md; chapters are registered here as they are authored.
export const COURSES: Record<string, Course> = {
  [foundations.id]: foundations,
  [collections.id]: collections,
  [controlFlow.id]: controlFlow,
  [functions.id]: functions,
  [filesErrors.id]: filesErrors,
  [modules.id]: modules,
  [classes.id]: classes,
  [dataModel.id]: dataModel,
  [composition.id]: composition,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
