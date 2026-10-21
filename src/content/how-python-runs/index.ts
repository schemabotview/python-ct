import type { Course } from '../types'
import { whatHappens } from './01-what-happens-when-you-run-python'
import { sourceToBytecode } from './02-source-to-bytecode'
import { theVirtualMachine } from './03-the-virtual-machine'
import { framesAndCallStack } from './04-frames-and-the-call-stack'
import { namesAndNamespaces } from './05-names-and-namespaces'
import { objectsIdentity } from './06-objects-identity-type-value'
import { refcountAndGc } from './07-reference-counting-and-gc'
import { theGilAndFreeThreading } from './08-the-gil-and-free-threading'
import { readingATraceback } from './09-reading-a-traceback'

export const howPythonRuns: Course = {
  id: 'how-python-runs',
  title: 'How Python runs your code',
  sections: [whatHappens, sourceToBytecode, theVirtualMachine, framesAndCallStack, namesAndNamespaces, objectsIdentity, refcountAndGc, theGilAndFreeThreading, readingATraceback],
}
