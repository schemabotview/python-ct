import type { Scene } from '@graphlearning/flow'
import { importForms } from './import-forms'
import { packageGraph } from './package-graph'
import { entryPoints } from './entry-points'
import { stdlibTour } from './stdlib-tour'
import { venvCommands } from './venv-commands'
import { projectFiles } from './project-files'

// One bundle per course folder, spread into src/scenes/index.ts.
export const modulesScenes: Scene[] = [
  importForms,
  packageGraph,
  entryPoints,
  stdlibTour,
  venvCommands,
  projectFiles,
]
