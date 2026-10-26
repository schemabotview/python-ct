import type { Course } from '../types'
import { modules } from './01-modules'
import { packages } from './02-packages'
import { ifNameMain } from './03-if-name-main'
import { typeHints } from './04-type-hints'
import { dependenciesAndMypy } from './05-dependencies-and-mypy'

export const structureCourse: Course = {
  id: 'structure',
  title: 'Structure the pipeline',
  sections: [modules, packages, ifNameMain, typeHints, dependenciesAndMypy],
}
