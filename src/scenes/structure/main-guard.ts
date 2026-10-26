import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, PACKAGE } from './tree'
import code from '../../../spine/structure/03-main-guard/project/main.py?raw'
import session from '../../../spine/structure/03-main-guard/session.txt?raw'

// §3 — if __name__ == "__main__": the same file run and imported. Both answers are the session's.
export const structureMainGuard: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'main.py'], { active: 'main.py' }),
  editor: { file: 'main.py', code, highlight: linesFrom(code, 'if __name__', '    main()'), show: [[lineOf(code, 'from pathlib'), lineOf(code, 'from pipeline.transform')], [lineOf(code, 'def main'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'table', id: 'ways', title: 'Two ways into main.py', tone: 'ingest', columns: ['started by', '__name__', 'main() runs?'], rows: [
        { cells: ['python main.py', "'__main__'", 'yes'], tone: 'store' }, ['import main', "'main'", 'no'],
      ],
    },
    {
      type: 'group', id: 'flow', title: 'One guard at the bottom of the file', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'defs', title: 'the file runs top to bottom', sub: 'imports, RAW, OUT, def main: definitions only', icon: 'python' },
        { type: 'item', id: 'guard', title: 'if __name__ == "__main__":', sub: 'true only when run as a script', icon: 'lock' },
        { type: 'item', id: 'job', title: 'main()', sub: 'the whole job', icon: 'zap', tone: 'store' },
      ],
    },
    { type: 'table', id: 'asked', title: 'Asked', tone: 'store', columns: ['typed', 'answer'], rows: [["python -c \"import main; print(…)\"", 'imported: main'], ['__name__, in the REPL', "'__main__'"]] },
    { type: 'item', id: 'mg-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['everything above the guard only defines', 'the guard runs the job, only as a script'] },
  ],
  edges: [{ from: 'defs', to: 'guard' }, { from: 'guard', to: 'job', label: 'when run' }],
})
