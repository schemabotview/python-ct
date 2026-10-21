import type { Scene } from '@graphlearning/flow'
import { cli } from './cli'
import { configScene } from './config'
import { packaging } from './packaging'
import { schedule } from './schedule'
import { finished } from './finished'
import { whereNext } from './where-next'

export const shipScenes: Scene[] = [cli, configScene, packaging, schedule, finished, whereNext]
