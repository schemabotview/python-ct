import type { Course } from '../types'
import { measureFirst } from './01-measure-first'
import { theRightDataStructure } from './02-the-right-data-structure'
import { memory } from './03-memory'
import { cpuBoundVsIoBound } from './04-cpu-bound-vs-io-bound'
import { threadsAndTheGil } from './05-threads-and-the-gil'
import { processes } from './06-processes'
import { asyncioSection } from './07-asyncio'

export const speedCourse: Course = {
  id: 'speed',
  title: 'Make it fast',
  sections: [measureFirst, theRightDataStructure, memory, cpuBoundVsIoBound, threadsAndTheGil, processes, asyncioSection],
}
