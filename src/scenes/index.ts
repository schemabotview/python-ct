import type { SceneModel } from '@graphlearning/graphl-flow'
import { pipelineMap } from './map'
import { pictureScenes } from './picture'
import { startScenes } from './start'
import { holdScenes } from './hold'
import { processScenes } from './process'
import { extractScenes } from './extract'
import { transformScenes } from './transform'
import { loadScenes } from './load'

// Scene registry. Sections reference scenes by id; a graphl-flow scene carries no id of its own, so
// the id is the key here. Scenes are grouped by course (one folder each, mirroring src/content),
// each folder exporting a Record; ids are globally unique, and a duplicate THROWS rather than
// letting one course's scene shadow another's.
const GROUPS: Record<string, SceneModel>[] = [{ 'pipeline-map': pipelineMap }, pictureScenes, startScenes, holdScenes, processScenes, extractScenes, transformScenes, loadScenes]

export const SCENES: Record<string, SceneModel> = {}
for (const group of GROUPS)
  for (const [id, scene] of Object.entries(group)) {
    if (id in SCENES) throw new Error(`scene id "${id}" is registered twice`)
    SCENES[id] = scene
  }

export function getScene(id: string): SceneModel | undefined {
  return SCENES[id]
}
