import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, PACKAGE } from './tree'
import code from '../../../spine/structure/02-packages/project/main.py?raw'
import session from '../../../spine/structure/02-packages/session.txt?raw'

// §2 — a package: pipeline/ with __init__.py and four stage modules. What `import pipeline.transform`
// loads, and `import main` running the job, are the session's.
export const structurePackages: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'main.py'], { active: 'main.py', fresh: ['pipeline/', ...PACKAGE] }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'from pipeline.extract', 'from pipeline.transform'), show: [[lineOf(code, 'from pathlib'), lineOf(code, 'from pipeline.transform')], [lineOf(code, 'def main'), lastLine(code)]] },
  session,
  side: [
    { type: 'item', id: 'main', title: 'main.py', sub: 'RAW, OUT and main(): the job, nothing else', icon: 'python' },
    {
      type: 'group', id: 'pkg', title: 'pipeline/: a folder with __init__.py', icon: 'package', tone: 'ingest', children: [
        { type: 'item', id: 'extract', title: 'extract.py', sub: 'read_text, iter_rows', icon: 'python' },
        { type: 'item', id: 'load', title: 'load.py', sub: 'write_report, write_summary, load_warehouse', icon: 'python' },
        { type: 'item', id: 'transform', title: 'transform.py', sub: 'price_line, priced_lines, summarise', icon: 'python' },
        { type: 'item', id: 'validate', title: 'validate.py', sub: 'CATALOGUE, InvalidOrder, parse_row', icon: 'python' },
      ],
    },
    { type: 'table', id: 'loaded', title: 'import pipeline.transform loads', tone: 'store', columns: ['module', 'because'], rows: [['pipeline', 'its __init__.py runs first'], ['pipeline.transform', 'asked for'], ['pipeline.validate', 'transform imports it']] },
  ],
  edges: [{ from: 'main', to: 'pkg', label: 'from pipeline.… import' }, { from: 'transform', to: 'validate', label: 'from .validate import' }],
})
