import type { Scene } from '@graphlearning/flow'
import { pytestScene } from './pytest'
import { fixtures } from './fixtures'
import { doubles } from './doubles'
import { loggingScene } from './logging'
import { decorators } from './decorators'
import { debugging } from './debugging'
import { ruffScene } from './ruff'

export const trustScenes: Scene[] = [pytestScene, fixtures, doubles, loggingScene, decorators, debugging, ruffScene]
