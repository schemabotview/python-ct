import type { Scene } from '@graphlearning/flow'
import { grouping } from './grouping'
import { counter } from './counter'
import { sorting } from './sorting'
import { statistics } from './statistics'
import { dates } from './dates'
import { itertoolsScene } from './itertools'
import { transform } from './transform'

export const aggregateScenes: Scene[] = [grouping, counter, sorting, statistics, dates, itertoolsScene, transform]
