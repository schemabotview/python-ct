import type { SceneModel } from '@graphlearning/graphl-flow'
import { loadCsvReport } from './csv-report'
import { loadFormatting } from './formatting'
import { loadJson } from './json'
import { loadSqlite } from './sqlite'
import { loadSafeReruns } from './safe-reruns'
import { loadWholeScript } from './whole-script'

export const loadScenes: Record<string, SceneModel> = {
  'load-csv-report': loadCsvReport,
  'load-formatting': loadFormatting,
  'load-json': loadJson,
  'load-sqlite': loadSqlite,
  'load-safe-reruns': loadSafeReruns,
  'load-whole-script': loadWholeScript,
}
