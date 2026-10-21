import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import session from '../../../spine/start/02-new-project/session.txt?raw'
import cfg from '../../../spine/start/02-new-project/captured/.venv/pyvenv.cfg?raw'

export const newProject: Scene = ideFrame(
  'new-project',
  'roastery-etl',
  [
    {
      name: '.venv',
      state: 'new',
      children: [
        { name: 'bin', note: '11 files', children: [{ name: 'activate' }, { name: 'pip' }, { name: 'python' }, { name: 'python3.14' }] },
        { name: 'include', folder: true },
        { name: 'lib', folder: true, note: 'installed packages go here' },
        { name: 'lib64', folder: true },
        { name: '.gitignore' },
        { name: 'pyvenv.cfg', state: 'active' },
      ],
    },
  ],
  { file: '.venv/pyvenv.cfg', code: cfg, highlight: [1, 4], pattern: 'network', terminal: session },
  {
    id: 'venv-facts',
    kind: 'list',
    pills: true,
    icon: 'box',
    label: 'A virtual environment',
    sub: 'one per project',
    pattern: 'network',
    items: [
      'Its own python and pip, in .venv/bin',
      'Its own installed packages, in .venv/lib',
      'pyvenv.cfg points back at the Python it was made from',
      'activate puts .venv/bin first, so python means this one',
      'Never committed — it is rebuilt, not shared',
    ],
  },
)
