import type { Course } from '../types'
import { whatPythonIs } from './01-what-python-is'
import { whereItCameFrom } from './02-where-it-came-from'
import { thePhilosophy } from './03-the-philosophy'
import { strengthsAndLimits } from './04-strengths-and-limits'
import { whatWeWillBuild } from './05-what-we-will-build'
import { pythonMainPy } from './06-python-main-py'
import { sourceToBytecode } from './07-source-to-bytecode'
import { theVirtualMachine } from './08-the-virtual-machine'
import { theCallStack } from './09-the-call-stack'
import { namesAndObjects } from './10-names-and-objects'
import { referenceCounting } from './11-reference-counting'

export const picture: Course = {
  id: 'picture',
  title: 'The picture: why Python, and how it runs your code',
  sections: [whatPythonIs, whereItCameFrom, thePhilosophy, strengthsAndLimits, whatWeWillBuild, pythonMainPy, sourceToBytecode, theVirtualMachine, theCallStack, namesAndObjects, referenceCounting],
}
