import type { Scene } from '@graphlearning/flow'
import { files } from './files'
import { encodings } from './encodings'
import { pathlibScene } from './pathlib'
import { csvRows } from './csv-rows'
import { jsonCatalogue } from './json-catalogue'
import { validating } from './validating'
import { generators } from './generators'

export const extractScenes: Scene[] = [files, encodings, pathlibScene, csvRows, jsonCatalogue, validating, generators]
