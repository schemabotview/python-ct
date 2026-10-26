import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { dataTree, DAYS_1_3 } from './tree'
import code from '../../../spine/extract/03-pathlib/project/main.py?raw'
import session from '../../../spine/extract/03-pathlib/session.txt?raw'

// §3 — pathlib: every day file found with a glob. The parts are the session's; so is the mangled
// ORD-1012 (split(",") breaks the quoted "smith, kim").
export const extractPathlib: SceneModel = ideFrame({
  tree: dataTree(DAYS_1_3, { fresh: ['orders-2026-10-03.csv'] }),
  editor: { file: 'main.py', code, highlight: [lineOf(code, 'RAW = Path'), ...linesFrom(code, 'DAYS = {', 'for path in sorted')], show: [[1, lineOf(code, 'RAW = Path')], [lineOf(code, 'def read_text'), lineOf(code, 'return path.read_text(encoding="latin-1")')], [lineOf(code, 'DAYS = {'), lineOf(code, '}', lineOf(code, 'DAYS = {'))]] },
  session,
  side: [
    {
      type: 'group', id: 'glob', title: 'sorted(RAW.glob("orders-*.csv"))', icon: 'folder', tone: 'ingest', dir: 'row', children: [
        { type: 'item', id: 'raw', title: 'Path("data/raw")', sub: 'a folder, as an object', icon: 'folder' },
        { type: 'table', id: 'found', title: 'three paths', tone: 'store', rows: [['orders-2026-10-01.csv'], ['orders-2026-10-02.csv'], ['orders-2026-10-03.csv']] },
      ],
    },
    { type: 'table', id: 'parts', title: 'A path, in parts', tone: 'ingest', columns: ['', ''], rows: [['.name', "'orders-2026-10-01.csv'"], ['.stem', "'orders-2026-10-01'"], ['.suffix', "'.csv'"]] },
    {
      type: 'table', id: 'out', title: 'What the run printed', tone: 'ingest', columns: ['day', 'lines', 'total'], rows: [
        ['2026-10-01', 6, '277.20'], ['2026-10-02', 2, '37.40'], ['2026-10-03', 4, '199.65'], { cells: ["rejected ORD-1012: quantity 'BRA-500'", '', ''], tone: 'consume' },
      ],
    },
    { type: 'note', id: 'bug', tone: 'ingest', text: 'ORD-1012 is a bug, not bad data: its customer is "smith, kim", and split(",") cut it in two. Next: the csv module.' },
    {
      type: 'table', id: 'ops', title: 'What a Path can do', tone: 'ingest', columns: ['', ''], rows: [
        ['RAW / "catalogue.json"', '/ joins paths, on any system'], ['path.read_text()', 'the whole file, as a str'], ['path.exists()', 'True or False'],
      ],
    },
    { type: 'item', id: 'pa-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['paths are objects, not strings', 'glob finds files by pattern'] },
  ],
  edges: [{ from: 'raw', to: 'found', label: 'glob' }],
})
