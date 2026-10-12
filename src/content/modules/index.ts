import type { Course } from '../types'
import { modulesImportsAndNamespaces } from './01-modules-imports-and-namespaces'
import { packagesAndCircularDependencies } from './02-packages-and-circular-dependencies'
import { scriptEntryPointsAndPythonM } from './03-script-entry-points-and-python-m'
import { discoveringTheStandardLibrary } from './04-discovering-the-standard-library'
import { virtualEnvironmentsAndDependencies } from './05-virtual-environments-and-dependencies'
import { projectBoundariesAndReproducibility } from './06-project-boundaries-and-reproducibility'

// Chapter 6 — Modules, Environments, and Dependencies.
export const modules: Course = {
  id: 'modules',
  title: 'Modules, Environments, and Dependencies',
  sections: [
    modulesImportsAndNamespaces,
    packagesAndCircularDependencies,
    scriptEntryPointsAndPythonM,
    discoveringTheStandardLibrary,
    virtualEnvironmentsAndDependencies,
    projectBoundariesAndReproducibility,
  ],
}
