import type { Course } from '../types'
import { firstClassFunctionsAndCallbacks } from './01-first-class-functions-and-callbacks'
import { closuresAndLateBinding } from './02-closures-and-late-binding'
import { decoratorsAndWrappingOrder } from './03-decorators-and-wrapping-order'
import { functoolsWrapsPartialAndCaching } from './04-functools-wraps-partial-and-caching'
import { typeHintsGenericsAndProtocols } from './05-type-hints-generics-and-protocols'
import { dispatchStrategiesAndSimplicity } from './06-dispatch-strategies-and-simplicity'

// Chapter 9 — Functions as Objects and Advanced Composition.
export const composition: Course = {
  id: 'composition',
  title: 'Functions as Objects and Advanced Composition',
  sections: [
    firstClassFunctionsAndCallbacks,
    closuresAndLateBinding,
    decoratorsAndWrappingOrder,
    functoolsWrapsPartialAndCaching,
    typeHintsGenericsAndProtocols,
    dispatchStrategiesAndSimplicity,
  ],
}
