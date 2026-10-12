import type { Course } from '../types'
import { iterablesAndIterators } from './01-iterables-and-iterators'
import { generatorFunctionsAndYield } from './02-generator-functions-and-yield'
import { lazyPipelinesAndItertools } from './03-lazy-pipelines-and-itertools'
import { contextManagersAndContextlib } from './04-context-managers-and-contextlib'
import { equalityIdentityAndHashing } from './05-equality-identity-and-hashing'
import { representationsTruthAndInspection } from './06-representations-truth-and-inspection'
import { specialMethodsForContainersAndOperators } from './07-special-methods-for-containers-and-operators'
import { propertiesAndAttributeAccess } from './08-properties-and-attribute-access'
import { objectLifetimeAndCleanup } from './09-object-lifetime-and-cleanup'

// Chapter 8 — Iteration, Context, and the Python Data Model.
export const dataModel: Course = {
  id: 'data-model',
  title: 'Iteration, Context, and the Python Data Model',
  sections: [
    iterablesAndIterators,
    generatorFunctionsAndYield,
    lazyPipelinesAndItertools,
    contextManagersAndContextlib,
    equalityIdentityAndHashing,
    representationsTruthAndInspection,
    specialMethodsForContainersAndOperators,
    propertiesAndAttributeAccess,
    objectLifetimeAndCleanup,
  ],
}
