import type { SceneModel } from '@graphlearning/graphl-flow'
import { transformGrouping } from './grouping'
import { transformCounter } from './counter'
import { transformSorting } from './sorting'
import { transformStatistics } from './statistics'
import { transformDates } from './dates'
import { transformItertools } from './itertools'
import { transformSummarise } from './summarise'

export const transformScenes: Record<string, SceneModel> = {
  'transform-grouping': transformGrouping,
  'transform-counter': transformCounter,
  'transform-sorting': transformSorting,
  'transform-statistics': transformStatistics,
  'transform-dates': transformDates,
  'transform-itertools': transformItertools,
  'transform-summarise': transformSummarise,
}
