import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { shipTree } from './tree'
import code from '../../../spine/ship/02-config/project/pipeline/config.py?raw'
import session from '../../../spine/ship/02-config/session.txt?raw'

export const configScene: Scene = ideFrame(
  'ship-config',
  'roastery-etl',
  shipTree(2),
  { file: 'pipeline/config.py', title: 'pipeline/config.py', code, show: [[1, 1], [8, 24]], highlight: [12, 14, 16, 21, 22, 23], terminal: session },
  {
    id: 'ship-config-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'settings',
        kind: 'table',
        label: "Settings, and where they come from",
        headers: ["setting", "from", "default"],
        values: [
          ["raw", "ROASTERY_RAW", "data/raw"],
          ["out", "ROASTERY_OUT", "data/out"],
          ["shop_token", "ROASTERY_SHOP_TOKEN", "none"],
        ],
      },
      {
        id: 'ship-config-facts',
        kind: 'list',
        icon: 'key',
        label: "Secrets stay out of code",
        pattern: 'user',
        items: [
          "The same code runs on a laptop and a server",
          "A secret lives in the environment, never in git",
          "__repr__ says \"set\", never the value",
          ".env and data/out are in .gitignore",
        ],
      },
    ],
  },
)
