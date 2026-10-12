import type { Course } from '../types'
import { pathsAndFilesystemOperations } from './01-paths-and-filesystem-operations'
import { textBytesAndEncodings } from './02-text-bytes-and-encodings'
import { fileReadingWritingAndModes } from './03-file-reading-writing-and-modes'
import { withAndDeterministicCleanup } from './04-with-and-deterministic-cleanup'
import { csvAndJson } from './05-csv-and-json'
import { exceptionsAndTargetedHandling } from './06-exceptions-and-targeted-handling'
import { raisingAndChainingExceptions } from './07-raising-and-chaining-exceptions'
import { validationAndRecoveryPolicies } from './08-validation-and-recovery-policies'
import { datesTimeZonesAndDecimal } from './09-dates-time-zones-and-decimal'
import { importToReportFlow } from './10-import-to-report-flow'

// Chapter 5 — Files, Structured Data, and Failure Handling.
export const filesErrors: Course = {
  id: 'files-errors',
  title: 'Files, Structured Data, and Failure Handling',
  sections: [
    pathsAndFilesystemOperations,
    textBytesAndEncodings,
    fileReadingWritingAndModes,
    withAndDeterministicCleanup,
    csvAndJson,
    exceptionsAndTargetedHandling,
    raisingAndChainingExceptions,
    validationAndRecoveryPolicies,
    datesTimeZonesAndDecimal,
    importToReportFlow,
  ],
}
