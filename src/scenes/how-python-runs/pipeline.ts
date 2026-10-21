import type { Scene } from '@graphlearning/flow'
import { ideFrame } from '../ide'
import code from '../../../spine/how-python-runs/01-pipeline/project/line_total.py?raw'
import session from '../../../spine/how-python-runs/01-pipeline/session.txt?raw'

// The parse and compile rows quote real output from this same file on CPython 3.14.6: ast.dump of
// line 3, and `python -m dis` (replayed in the next two sections' terminals).
export const runPipeline: Scene = ideFrame(
  'run-pipeline',
  'how-python-runs',
  [{ name: 'line_total.py', state: 'active' }],
  { file: 'line_total.py', code, highlight: [3], pattern: 'network', terminal: session },
  {
    id: 'run-pipeline-pane',
    label: 'side',
    bare: true,
    children: [
      {
        id: 'stages',
        kind: 'table',
        label: 'Line 3, through six stages',
        headers: ['', 'stage', 'line 3 becomes'],
        values: [
          ['1', 'read', 'text: total = price * qty'],
          ['2', 'tokenize', 'NAME OP NAME OP NAME'],
          ['3', 'parse', 'Assign(value=BinOp(Mult))'],
          ['4', 'compile', '4 bytecode instructions'],
          ['5', 'execute', 'the virtual machine runs them'],
          ['6', 'output', '19.0'],
        ],
      },
      {
        id: 'loop',
        kind: 'list',
        icon: 'repeat',
        label: 'Every run, every time',
        pattern: 'service',
        items: [
          'Stages 1–4 are the compiler: a SyntaxError stops here',
          'Stage 5 is the evaluation loop: fetch, do, repeat',
          'The machine is a C program: CPython',
        ],
      },
    ],
  },
)
