import type { Scene } from '@graphlearning/flow'
import { foundationsScenes } from './foundations'
import { collectionsScenes } from './collections'
import { controlFlowScenes } from './control-flow'
import { functionsScenes } from './functions'
import { filesErrorsScenes } from './files-errors'
import { modulesScenes } from './modules'
import { classesScenes } from './classes'
import { dataModelScenes } from './data-model'
import { compositionScenes } from './composition'
import { concurrencyScenes } from './concurrency'
import { qualityPackagingScenes } from './quality-packaging'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...foundationsScenes, ...collectionsScenes, ...controlFlowScenes, ...functionsScenes, ...filesErrorsScenes, ...modulesScenes, ...classesScenes, ...dataModelScenes, ...compositionScenes, ...concurrencyScenes, ...qualityPackagingScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
