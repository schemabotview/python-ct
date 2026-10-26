import type { SceneModel } from '@graphlearning/graphl-flow'
import { extractFiles } from './files'
import { extractEncodings } from './encodings'
import { extractPathlib } from './pathlib'
import { extractCsv } from './csv'
import { extractJson } from './json'
import { extractValidating } from './validating'
import { extractGenerators } from './generators'

export const extractScenes: Record<string, SceneModel> = {
  'extract-files': extractFiles,
  'extract-encodings': extractEncodings,
  'extract-pathlib': extractPathlib,
  'extract-csv': extractCsv,
  'extract-json': extractJson,
  'extract-validating': extractValidating,
  'extract-generators': extractGenerators,
}
