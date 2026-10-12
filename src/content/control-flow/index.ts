import type { Course } from '../types'
import { truthValuesAndBooleanLogic } from './01-truth-values-and-boolean-logic'
import { ifElifElseAndNestedDecisions } from './02-if-elif-else-and-nested-decisions'
import { forLoopsRangeEnumerateAndZip } from './03-for-loops-range-enumerate-and-zip'
import { whileLoopsProgressAndTermination } from './04-while-loops-progress-and-termination'
import { breakContinueLoopElseAndMistakes } from './05-break-continue-loop-else-and-mistakes'
import { structuralPatternMatching } from './06-structural-pattern-matching'
import { loopsComprehensionsAndSmallAlgorithms } from './07-loops-comprehensions-and-small-algorithms'

// Chapter 3 — Decisions, Loops, and Problem Decomposition.
export const controlFlow: Course = {
  id: 'control-flow',
  title: 'Decisions, Loops, and Problem Decomposition',
  sections: [
    truthValuesAndBooleanLogic,
    ifElifElseAndNestedDecisions,
    forLoopsRangeEnumerateAndZip,
    whileLoopsProgressAndTermination,
    breakContinueLoopElseAndMistakes,
    structuralPatternMatching,
    loopsComprehensionsAndSmallAlgorithms,
  ],
}
