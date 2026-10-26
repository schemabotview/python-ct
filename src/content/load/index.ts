import type { Course } from '../types'
import { writingACsvReport } from './01-writing-a-csv-report'
import { formatting } from './02-formatting'
import { writingJson } from './03-writing-json'
import { sqlite3Section } from './04-sqlite3'
import { safeReruns } from './05-safe-reruns'
import { theWholeScript } from './06-the-whole-script'

export const loadCourse: Course = {
  id: 'load',
  title: 'Write the results',
  sections: [writingACsvReport, formatting, writingJson, sqlite3Section, safeReruns, theWholeScript],
}
