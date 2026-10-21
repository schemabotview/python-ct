import type { Scene, SceneNode } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/how-python-runs/05-names/project/names.py?raw'
import session from '../../../spine/how-python-runs/05-names/session.txt?raw'

const name = (id: string): SceneNode => ({ id, label: id, variant: 'chip', pattern: 'network', icon: 'none' })

export const namesObjects: Scene = ideFrame(
  'names-objects',
  'how-python-runs',
  [{ name: 'names.py', state: 'active' }],
  { file: 'names.py', code, highlight: [2], pattern: 'network', terminal: session },
  {
    id: 'names-objects-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'model',
        label: 'Names and objects',
        sub: 'after line 3',
        pattern: 'network',
        icon: 'none',
        children: [
          { id: 'namespace', label: 'Global namespace', sub: 'a dict of names', pattern: 'network', icon: 'none', cols: 2, children: [name('order'), name('same')] },
          {
            id: 'heap', label: 'Heap', sub: 'where objects live', pattern: 'storage', icon: 'none',
            children: [{ id: 'list', kind: 'list', icon: 'box', label: 'one list object', sub: 'type: list', pattern: 'storage', items: ["'ETH-250'", "'COL-500'", "'BRA-1K'"] }],
          },
        ],
        edges: [
          { source: 'order', target: 'list', label: 'refers to' },
          { source: 'same', target: 'list', label: 'refers to' },
        ],
      },
      { id: 'lesson', kind: 'note', pattern: 'network', label: 'same = order copied nothing: two names, one list — so a change through either name shows in both' },
    ],
  },
)
