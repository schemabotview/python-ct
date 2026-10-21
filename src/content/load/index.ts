import type { Course } from '../types'
import { writingACsvReport } from './01-writing-a-csv-report'
import { formattingSection } from './02-formatting'
import { writingJson } from './03-writing-json'
import { sqliteSection } from './04-sqlite'
import { safeReRuns } from './05-safe-re-runs'
import { theWholeScript } from './06-the-whole-script'

export const loadCourse: Course = {
  id: 'load',
  title: 'Write the results',
  sections: [writingACsvReport, formattingSection, writingJson, sqliteSection, safeReRuns, theWholeScript],
}
