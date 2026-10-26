import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, linesFrom } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/06-inheritance/project/pipeline/errors.py?raw'
import session from '../../../spine/model/06-inheritance/session.txt?raw'

// §6 — inheritance and super(): PipelineError over InvalidRow and UnknownProduct. The counts are the
// session's (9 invalid rows, 4 unknown products).
export const modelInheritance: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'pipeline/errors.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/errors.py', fresh: ['pipeline/errors.py'] }),
  editor: { file: 'pipeline/errors.py', code, highlight: linesFrom(code, 'class UnknownProduct', 'self.sku = sku') },
  session,
  side: [
    {
      type: 'group', id: 'tree', title: 'One family of errors', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'exc', title: 'Exception', sub: "Python's own", icon: 'code' },
        { type: 'item', id: 'base', title: 'PipelineError', sub: 'everything the pipeline refuses', icon: 'bell' },
        {
          type: 'group', id: 'kids', bare: true, dir: 'row', children: [
            { type: 'item', id: 'invalid', title: 'InvalidRow', sub: '9 in October', icon: 'bell', tone: 'consume' },
            { type: 'item', id: 'unknown', title: 'UnknownProduct', sub: '4: GUA-250, with .sku', icon: 'bell', tone: 'consume' },
          ],
        },
      ],
    },
    {
      type: 'table', id: 'catches', title: 'Which except catches which', tone: 'store', columns: ['except', 'InvalidRow', 'UnknownProduct'], rows: [
        ['PipelineError', 'yes', 'yes'], ['InvalidRow', 'yes', 'no'], ['UnknownProduct', 'no', 'yes'],
      ],
    },
    { type: 'item', id: 'in-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a subclass is a kind of its parent', 'except Parent catches every child'] },
    { type: 'note', id: 'in-note', tone: 'ingest', text: 'super().__init__(message) lets Exception store the message; UnknownProduct adds only what is new, the sku.' },
  ],
  edges: [{ from: 'exc', to: 'base', label: 'subclass' }, { from: 'base', to: 'kids', label: 'subclasses' }],
})
