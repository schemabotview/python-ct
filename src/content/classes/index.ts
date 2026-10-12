import type { Course } from '../types'
import { classesInstancesAndConstruction } from './01-classes-instances-and-construction'
import { attributeLookupAndSharing } from './02-attribute-lookup-and-sharing'
import { methodsSelfAndClassMethods } from './03-methods-self-and-class-methods'
import { dataclassesAndGeneratedMethods } from './04-dataclasses-and-generated-methods'
import { compositionAndCollaboration } from './05-composition-and-collaboration'
import { inheritanceOverridingAndSuper } from './06-inheritance-overriding-and-super'
import { polymorphismAndDuckTyping } from './07-polymorphism-and-duck-typing'
import { invariantsAndFunctionsVersusClasses } from './08-invariants-and-functions-versus-classes'

// Chapter 7 — Classes and Domain Modelling.
export const classes: Course = {
  id: 'classes',
  title: 'Classes and Domain Modelling',
  sections: [
    classesInstancesAndConstruction,
    attributeLookupAndSharing,
    methodsSelfAndClassMethods,
    dataclassesAndGeneratedMethods,
    compositionAndCollaboration,
    inheritanceOverridingAndSuper,
    polymorphismAndDuckTyping,
    invariantsAndFunctionsVersusClasses,
  ],
}
