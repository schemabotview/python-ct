import type { Course } from '../types'
import { namesAndObjects } from './01-names-and-objects'
import { numbers } from './02-numbers'
import { decimalForMoney } from './03-decimal-for-money'
import { strings } from './04-strings'
import { booleansAndNone } from './05-booleans-and-none'
import { lists } from './06-lists'
import { tuples } from './07-tuples'
import { dictionaries } from './08-dictionaries'
import { sets } from './09-sets'
import { nestingAliasingCopying } from './10-nesting-aliasing-copying'

export const hold: Course = {
  id: 'hold',
  title: 'Hold the data',
  sections: [namesAndObjects, numbers, decimalForMoney, strings, booleansAndNone, lists, tuples, dictionaries, sets, nestingAliasingCopying],
}
