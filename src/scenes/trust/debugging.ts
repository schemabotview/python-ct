import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, lastLine } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/trust/06-debugging/project/pipeline/transform.py?raw'
import session from '../../../spine/trust/06-debugging/session.txt?raw'

// §6 — debugging: breakpoint() in summarise, reached from a failing test; pdb prints the median and
// walks up a frame. The pdb transcript is the session's.
export const trustDebugging: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/decorators.py', 'tests/conftest.py', 'tests/test_model.py', 'tests/test_validate.py', 'tests/test_pipeline.py', 'tests/test_decorators.py', 'tests/test_transform.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/transform.py', fresh: ['tests/test_transform.py'] }),
  editor: { file: 'pipeline/transform.py', code, highlight: [lineOf(code, 'breakpoint()'), lineOf(code, '"median": Money(')], show: [[lineOf(code, 'ranked = sorted'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'stack', title: 'The stack pdb stops in', icon: 'layers', tone: 'ingest', children: [
        { type: 'item', id: 'test', title: 'test_the_median_of_two_lines…', sub: 'tests/test_transform.py, line 12', icon: 'code' },
        { type: 'item', id: 'frame', title: 'summarise(lines)', sub: 'transform.py, line 45: breakpoint()', icon: 'zap', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'cmds', title: 'pdb, the commands used most', tone: 'ingest', columns: ['type', 'to'], rows: [
        ['p expression', 'print a value'], ['up / down', 'move one frame toward the caller / back'], ['n, s, c', 'next line, step in, continue'], ['q', 'quit'],
      ],
    },
    { type: 'table', id: 'found', title: 'What pdb showed', tone: 'store', columns: ['', ''], rows: [['the two totals', '9.95 and 31.00'], { cells: ['statistics.median', "Decimal('20.475'): not whole cents"], tone: 'consume' }] },
    { type: 'item', id: 'db-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['breakpoint() stops; pdb lets you look', 'a breakpoint never stays in the code'] },
    { type: 'note', id: 'db-note', tone: 'ingest', text: 'Money promised whole cents but only __mul__ rounded. Money(20.475) slipped through; the next section makes the class keep its promise.' },
  ],
  edges: [{ from: 'test', to: 'frame', label: 'calls' }],
})
