import type { Course } from '../types'
import { modulesSection } from './01-modules'
import { packagesSection } from './02-packages'
import { ifNameMain } from './03-if-name-main'
import { classesSection } from './04-classes'
import { dataclassesSection } from './05-dataclasses'
import { methodsAndProperties } from './06-methods-and-properties'
import { theDataModel } from './07-the-data-model'
import { typeHintsSection } from './08-type-hints'
import { dependenciesSection } from './09-dependencies'

export const structureCourse: Course = {
  id: 'structure',
  title: 'Structure the pipeline',
  sections: [
    modulesSection, packagesSection, ifNameMain, classesSection, dataclassesSection, methodsAndProperties,
    theDataModel, typeHintsSection, dependenciesSection,
  ],
}
