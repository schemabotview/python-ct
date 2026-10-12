import type { Course } from '../types'
import { testingAsAQualityTechnique } from './01-testing-as-a-quality-technique'
import { tracebacksDebuggingAndAssertions } from './02-tracebacks-debugging-and-assertions'
import { loggingLevelsAndContext } from './03-logging-levels-and-context'
import { timingAndProfiling } from './04-timing-and-profiling'
import { complexityCollectionsAndMemory } from './05-complexity-collections-and-memory'
import { securityBoundariesAndUntrustedInput } from './06-security-boundaries-and-untrusted-input'
import { commandLineInterfaces } from './07-command-line-interfaces'
import { integratedWalkthroughAndPackaging } from './08-integrated-walkthrough-and-packaging'

// Chapter 11 — Reliable, Efficient, and Distributable Programs.
export const qualityPackaging: Course = {
  id: 'quality-packaging',
  title: 'Reliable, Efficient, and Distributable Programs',
  sections: [
    testingAsAQualityTechnique,
    tracebacksDebuggingAndAssertions,
    loggingLevelsAndContext,
    timingAndProfiling,
    complexityCollectionsAndMemory,
    securityBoundariesAndUntrustedInput,
    commandLineInterfaces,
    integratedWalkthroughAndPackaging,
  ],
}
