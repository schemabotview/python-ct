import type { Scene } from '@graphlearning/flow'
import { csvReport } from './csv-report'
import { formatting } from './formatting'
import { jsonSummary } from './json-summary'
import { sqliteScene } from './sqlite'
import { safeReruns } from './safe-reruns'
import { wholeScript } from './whole-script'

export const loadScenes: Scene[] = [csvReport, formatting, jsonSummary, sqliteScene, safeReruns, wholeScript]
