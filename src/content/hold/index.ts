import type { Course } from '../types'
import { namesAndObjects } from './01-names-and-objects'
import { numbersAndDecimal } from './02-numbers-and-decimal'
import { strings } from './03-strings'
import { booleansNoneSentinels } from './04-booleans-none-sentinels'
import { lists } from './05-lists'
import { tuples } from './06-tuples'
import { dictionaries } from './07-dictionaries'
import { setsAndFrozendict } from './08-sets-and-frozendict'
import { nestingAndCopying } from './09-nesting-and-copying'

export const hold: Course = {
  id: 'hold',
  title: 'Hold the data',
  sections: [namesAndObjects, numbersAndDecimal, strings, booleansNoneSentinels, lists, tuples, dictionaries, setsAndFrozendict, nestingAndCopying],
}
