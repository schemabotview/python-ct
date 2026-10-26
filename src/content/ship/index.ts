import type { Course } from '../types'
import { aCommandLineInterface } from './01-a-command-line-interface'
import { configurationAndSecrets } from './02-configuration-and-secrets'
import { packaging } from './03-packaging'
import { runningOnASchedule } from './04-running-on-a-schedule'
import { theFinishedPipeline } from './05-the-finished-pipeline'
import { whereNext } from './06-where-next'

export const shipCourse: Course = {
  id: 'ship',
  title: 'Ship it',
  sections: [aCommandLineInterface, configurationAndSecrets, packaging, runningOnASchedule, theFinishedPipeline, whereNext],
}
