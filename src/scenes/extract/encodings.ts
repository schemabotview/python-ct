import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { dataTree } from './tree'
import code from '../../../spine/extract/02-encodings/project/main.py?raw'
import session from '../../../spine/extract/02-encodings/session.txt?raw'

// §2 — text and encodings: day 2 came from the shop's old till in Latin-1 (`file` says ISO-8859);
// UTF-8 refuses its é, so read_text falls back and says so (the session).
export const extractEncodings: SceneModel = ideFrame({
  tree: dataTree(['orders-2026-10-01.csv', 'orders-2026-10-02.csv'], { fresh: ['orders-2026-10-02.csv'] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'def read_text', 'return file.read()'), show: [[lineOf(code, 'def read_text'), lineOf(code, 'return file.read()', lineOf(code, 'latin-1'))], [lineOf(code, 'DAYS = {'), lineOf(code, '}', lineOf(code, 'DAYS = {'))]] },
  session,
  side: [
    {
      type: 'table', id: 'bytes', title: 'zoé, as the old till saved it', tone: 'ingest', columns: ['byte', 'as Latin-1', 'as UTF-8'], rows: [
        ['0x7A', 'z', 'z'], ['0x6F', 'o', 'o'], { cells: ['0xE9', 'é', 'invalid on its own'], tone: 'consume' },
      ],
    },
    {
      type: 'group', id: 'decode', title: 'Bytes become text only through an encoding', icon: 'workflow', tone: 'ingest', dir: 'row', children: [
        { type: 'item', id: 'raw', title: 'the bytes on disk', sub: '7A 6F E9', icon: 'disk' },
        { type: 'item', id: 'text', title: "the str 'zoé'", sub: 'three characters', icon: 'file', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'said', title: 'What the terminal said', tone: 'store', rows: [
        ['data/raw/orders-2026-10-02.csv is not UTF-8: read as Latin-1'], ['file: CSV ISO-8859 text'],
      ],
    },
    {
      type: 'table', id: 'pep686', title: 'Python 3.15: UTF-8 by default', tone: 'serve', columns: ['', ''], rows: [
        ['open(path)', 'now always UTF-8'], ['before 3.15', 'whatever the computer used'], ['still write', 'encoding="utf-8": say it'],
      ],
    },
    { type: 'item', id: 'en-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['UTF-8 writes é as two bytes: C3 A9', 'never guess an encoding silently'] },
    { type: 'note', id: 'decided', tone: 'ingest', text: 'The fallback is a decision, not a guess: the shop confirmed its old till writes Latin-1, and the run says each time it falls back.' },
  ],
  edges: [{ from: 'raw', to: 'text', label: 'decode' }],
})
