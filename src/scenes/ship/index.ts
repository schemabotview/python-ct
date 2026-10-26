import type { SceneModel } from '@graphlearning/graphl-flow'
import { shipCli } from './cli'
import { shipConfig } from './config'
import { shipPackaging } from './packaging'
import { shipSchedule } from './schedule'
import { shipFinished } from './finished'
import { shipWhereNext } from './where-next'

export const shipScenes: Record<string, SceneModel> = {
  'ship-cli': shipCli,
  'ship-config': shipConfig,
  'ship-packaging': shipPackaging,
  'ship-schedule': shipSchedule,
  'ship-finished': shipFinished,
  'ship-where-next': shipWhereNext,
}
