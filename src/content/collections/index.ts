import type { Course } from '../types'
import { stringsAsSequences } from './01-strings-as-sequences'
import { listsOrderedMutableCollections } from './02-lists-ordered-mutable-collections'
import { tuplesFixedRecords } from './03-tuples-fixed-records'
import { dictionariesKeyValueRecords } from './04-dictionaries-key-value-records'
import { setsMembershipAndUniqueness } from './05-sets-membership-and-uniqueness'
import { mutationAliasingIdentityAndCopying } from './06-mutation-aliasing-identity-and-copying'
import { unpackingNestedCollectionsAndRecordShapes } from './07-unpacking-nested-collections-and-record-shapes'
import { sortingAndTransformationBuiltins } from './08-sorting-and-transformation-builtins'
import { comprehensionsAsAPreview } from './09-comprehensions-as-a-preview'

// Chapter 2 — Collections and Data Transformation.
export const collections: Course = {
  id: 'collections',
  title: 'Collections and Data Transformation',
  sections: [
    stringsAsSequences,
    listsOrderedMutableCollections,
    tuplesFixedRecords,
    dictionariesKeyValueRecords,
    setsMembershipAndUniqueness,
    mutationAliasingIdentityAndCopying,
    unpackingNestedCollectionsAndRecordShapes,
    sortingAndTransformationBuiltins,
    comprehensionsAsAPreview,
  ],
}
