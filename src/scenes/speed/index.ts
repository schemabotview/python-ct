import type { Scene } from '@graphlearning/flow'
import { measure } from './measure'
import { dataStructure } from './data-structure'
import { memory } from './memory'
import { bound } from './bound'
import { threads } from './threads'
import { processes } from './processes'
import { asyncioScene } from './asyncio'

export const speedScenes: Scene[] = [measure, dataStructure, memory, bound, threads, processes, asyncioScene]
