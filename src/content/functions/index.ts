import type { Course } from '../types'
import { definitionsCallsAndReturnValues } from './01-definitions-calls-and-return-values'
import { positionalAndKeywordArguments } from './02-positional-and-keyword-arguments'
import { defaultsAndVariadicArguments } from './03-defaults-and-variadic-arguments'
import { argumentBindingAndObjectSharing } from './04-argument-binding-and-object-sharing'
import { scopeAndNameLookup } from './05-scope-and-name-lookup'
import { pureCalculationsAndSideEffects } from './06-pure-calculations-and-side-effects'
import { docstringsAnnotationsAndValidation } from './07-docstrings-annotations-and-validation'
import { recursionBaseCasesAndIteration } from './08-recursion-base-cases-and-iteration'
import { decompositionAndFunctionsAsValues } from './09-decomposition-and-functions-as-values'

// Chapter 4 — Functions, Scope, and Contracts.
export const functions: Course = {
  id: 'functions',
  title: 'Functions, Scope, and Contracts',
  sections: [
    definitionsCallsAndReturnValues,
    positionalAndKeywordArguments,
    defaultsAndVariadicArguments,
    argumentBindingAndObjectSharing,
    scopeAndNameLookup,
    pureCalculationsAndSideEffects,
    docstringsAnnotationsAndValidation,
    recursionBaseCasesAndIteration,
    decompositionAndFunctionsAsValues,
  ],
}
