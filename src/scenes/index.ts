import type { Scene } from '@graphlearning/flow'
import { whyPythonScenes } from './why-python'
import { howPythonRunsScenes } from './how-python-runs'
import { startScenes } from './start'
import { holdScenes } from './hold'
import { processScenes } from './process'
import { extractScenes } from './extract'
import { aggregateScenes } from './aggregate'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...whyPythonScenes, ...howPythonRunsScenes, ...startScenes, ...holdScenes, ...processScenes, ...extractScenes, ...aggregateScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
