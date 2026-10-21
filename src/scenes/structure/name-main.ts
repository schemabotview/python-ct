import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import { structureTree } from './tree'
import code from '../../../spine/structure/03-name-main/project/pipeline/extract.py?raw'
import session from '../../../spine/structure/03-name-main/session.txt?raw'

export const nameMain: Scene = ideFrame(
  'structure-name-main',
  'roastery-etl',
  structureTree({ step: 3 }),
  { file: 'pipeline/extract.py', title: 'pipeline/extract.py', code, show: [[1, 1], [30, 31], [42, 45]], highlight: [42], terminal: session },
  {
    id: 'structure-name-main-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'name-values',
        kind: 'table',
        label: 'The same module, three ways',
        headers: ["how it starts", "__name__"],
        values: [
          ["python -m pipeline.extract", "\"__main__\""],
          ["import pipeline.extract", "\"pipeline.extract\""],
          ["import main", "\"main\""],
        ],
      },
      {
        id: 'structure-name-main-facts',
        kind: 'list',
        icon: 'power',
        label: 'if __name__ == "__main__":',
        pattern: 'user',
        items: [
          "True only when the file is the program",
          "Run as a script: a quick self-check",
          "Imported: the block is skipped",
          "main.py guards main() the same way",
        ],
      },
    ],
  },
)
