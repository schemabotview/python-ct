import type { Scene } from '@graphlearning/flow'

// §1 — from an idea to a result. The interpreter is the node the section is about, so it is the one
// the section focuses; the dashed edge marks the part that is not code: the idea being written down.
export const programPipeline: Scene = {
  id: 'program-pipeline',
  title: 'From algorithm to result',
  flow: 'TB',
  nodes: [
    { id: 'algorithm', label: 'Algorithm', sub: 'steps in plain words', pattern: 'user', icon: 'workflow' },
    { id: 'source', label: 'Source code', sub: 'text in a .py file', pattern: 'storage', icon: 'filecode' },
    { id: 'interpreter', label: 'Interpreter', sub: 'carries out the text', pattern: 'service', icon: 'cpu' },
    { id: 'result', label: 'Result', sub: 'output on the screen', pattern: 'external', icon: 'monitor' },
  ],
  edges: [
    { source: 'algorithm', target: 'source', label: 'written down', dashed: true },
    { source: 'source', target: 'interpreter', label: 'read by' },
    { source: 'interpreter', target: 'result', label: 'produces' },
  ],
}
