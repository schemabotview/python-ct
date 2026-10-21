import type { Course } from '../types'
import { whatPythonIs } from './01-what-python-is'
import { whereItCameFrom } from './02-where-python-came-from'
import { thePhilosophy } from './03-the-philosophy'
import { strengthsAndLimits } from './04-strengths-and-limits'
import { whatWeWillBuild } from './05-what-we-will-build'

export const whyPython: Course = {
  id: 'why-python',
  title: 'Why Python',
  sections: [whatPythonIs, whereItCameFrom, thePhilosophy, strengthsAndLimits, whatWeWillBuild],
}
