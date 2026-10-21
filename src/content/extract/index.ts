import type { Course } from '../types'
import { filesAndWith } from './01-files-and-with'
import { textAndEncodings } from './02-text-and-encodings'
import { pathlibSection } from './03-pathlib'
import { csvSection } from './04-csv'
import { jsonSection } from './05-json'
import { validatingRows } from './06-validating-rows'
import { generatorsSection } from './07-generators'

export const extractCourse: Course = {
  id: 'extract',
  title: 'Read the data',
  sections: [filesAndWith, textAndEncodings, pathlibSection, csvSection, jsonSection, validatingRows, generatorsSection],
}
