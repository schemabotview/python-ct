import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, linesFrom } from '../ide'
import { codeTree } from './tree'
import code from '../../../spine/structure/01-modules/project/extract.py?raw'
import session from '../../../spine/structure/01-modules/session.txt?raw'

// §1 — modules: extract.py leaves main.py. sys.modules and the lazy import are the session's (lazy
// import is new in 3.15, PEP 810).
export const structureModules: SceneModel = ideFrame({
  tree: codeTree(['extract.py', 'main.py'], { active: 'extract.py', fresh: ['extract.py'] }),
  editor: { file: 'extract.py', code, highlight: linesFrom(code, 'def iter_rows', 'yield from') },
  session,
  side: [
    {
      type: 'group', id: 'graph', title: 'The import graph', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'main', title: 'main.py', sub: 'from extract import iter_rows', icon: 'python' },
        { type: 'item', id: 'extract', title: 'extract.py', sub: 'runs once, top to bottom: defines read_text and iter_rows', icon: 'python', tone: 'store' },
      ],
    },
    { type: 'table', id: 'modules', title: 'sys.modules: every module imported so far', tone: 'store', columns: ['key', 'value'], rows: [['"extract"', "<module 'extract' from '…/extract.py'>"]] },
    {
      type: 'table', id: 'lazy', title: 'lazy import sqlite3, new in 3.15', tone: 'ingest', columns: ['typed', '"sqlite3" in sys.modules'], rows: [
        ['lazy import sqlite3', 'False: only a name, so far'], ['sqlite3.sqlite_version', "True: loaded on first use ('3.53.1')"],
      ],
    },
    {
      type: 'table', id: 'steps', title: 'The first import of a module', tone: 'ingest', columns: ['step', 'here'], rows: [
        ['find the file', 'extract.py, next to main.py'], ['run it, top to bottom', 'import csv, two defs'], ['keep the module', 'sys.modules["extract"]'],
      ],
    },
    { type: 'item', id: 'mo-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a module is a file; import runs it once', 'a second import finds it in sys.modules'] },
  ],
  edges: [{ from: 'main', to: 'extract', label: 'import' }],
})
