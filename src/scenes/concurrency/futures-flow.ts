import type { Scene } from '@graphlearning/flow'

// §4 — submitting work and collecting it three ways, and the table of what a Future reports in each
// state. Every row was observed on a thread pool; wait("slow", 0.3) etc. are sleeps standing in for I/O.
export const futuresFlow: Scene = {
  id: 'futures-flow',
  title: 'submit returns a Future',
  flow: 'TB',
  nodes: [
    {
      id: 'collect',
      kind: 'code',
      filename: 'futures.py',
      label: `with ThreadPoolExecutor(3) as ex:
    f = ex.submit(wait, "tea")      # returns at once with a Future
    f.result()                      # 'tea': blocks until ready
    futs = {ex.submit(wait, n, s): n for n, s in [("slow", .3), ("fast", .1), ("mid", .2)]}
    [futs[f] for f in as_completed(futs)]   # ['fast', 'mid', 'slow']: finish order
    list(ex.map(wait, "abc"))       # ['a', 'b', 'c']: submission order`,
    },
    {
      id: 'states',
      kind: 'table',
      label: 'What a Future does',
      headers: ['Situation', 'Result'],
      values: [
        ['the function raised', 'f.result() re-raises it'],
        ['ex.map and one item fails', 'the error appears when you reach it'],
        ['f.result(timeout=0.1), still running', 'TimeoutError; work continues'],
        ['f.cancel() while queued', 'True'],
        ['f.cancel() while running', 'False'],
        ['ex.submit after shutdown', 'RuntimeError'],
      ],
    },
  ],
  edges: [{ source: 'collect', target: 'states', label: 'collecting results' }],
}
