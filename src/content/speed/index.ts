import type { Course } from '../types'
import { measureFirst } from './01-measure-first'
import { theRightDataStructure } from './02-the-right-data-structure'
import { memorySection } from './03-memory'
import { cpuVersusIo } from './04-cpu-bound-versus-io-bound'
import { threadsAndTheGil } from './05-threads-and-the-gil'
import { processesSection } from './06-processes'
import { asyncioSection } from './07-asyncio'

export const speedCourse: Course = {
  id: 'speed',
  title: 'Make it fast',
  sections: [measureFirst, theRightDataStructure, memorySection, cpuVersusIo, threadsAndTheGil, processesSection, asyncioSection],
}
