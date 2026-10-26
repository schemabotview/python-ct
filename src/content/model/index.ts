import type { Course } from '../types'
import { classes } from './01-classes'
import { dataclassesSection } from './02-dataclasses'
import { propertiesAndInvariants } from './03-properties-and-invariants'
import { aValueObject } from './04-a-value-object'
import { containersAndConstructors } from './05-containers-and-alternate-constructors'
import { inheritanceAndSuper } from './06-inheritance-and-super'
import { polymorphism } from './07-polymorphism'
import { protocolsAndAbcs } from './08-protocols-and-abcs'
import { contextManagers } from './09-context-managers'
import { composition } from './10-composition'

export const modelCourse: Course = {
  id: 'model',
  title: 'Model the domain',
  sections: [classes, dataclassesSection, propertiesAndInvariants, aValueObject, containersAndConstructors, inheritanceAndSuper, polymorphism, protocolsAndAbcs, contextManagers, composition],
}
