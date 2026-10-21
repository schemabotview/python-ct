import type { Scene } from '@graphlearning/flow'
import { namesAndObjects } from './names-objects'
import { numbers } from './numbers'
import { decimalMoney } from './decimal'
import { strings } from './strings'
import { none } from './none'
import { lists } from './lists'
import { tuples } from './tuples'
import { dicts } from './dicts'
import { sets } from './sets'
import { copying } from './copying'

export const holdScenes: Scene[] = [namesAndObjects, numbers, decimalMoney, strings, none, lists, tuples, dicts, sets, copying]
