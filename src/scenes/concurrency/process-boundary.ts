import type { Scene } from '@graphlearning/flow'

// §3 — a process pool mapping a top-level function, then the three ways work fails to cross the process
// boundary (a lambda, a lock; a local function pickles by name but is looked up in the worker). Messages
// are copied from a real run. The table contrasts threads and processes.
export const processBoundary: Scene = {
  id: 'process-boundary',
  title: 'Processes do not share memory',
  flow: 'TB',
  nodes: [
    {
      id: 'pool',
      kind: 'code',
      filename: 'processes.py',
      label: `def square(n): return n * n          # must be importable by the worker

if __name__ == "__main__":             # required where workers are spawned
    with ProcessPoolExecutor(2) as ex:
        list(ex.map(square, range(5))) # [0, 1, 4, 9, 16]: each arg and result is pickled

ex.submit(lambda: 1)                   # AttributeError: Can't get local object '<lambda>...'
pickle.dumps(threading.Lock())         # TypeError: cannot pickle '_thread.lock' object`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Threads versus processes',
      headers: ['', 'Threads', 'Processes'],
      values: [
        ['memory', 'shared', 'separate copies'],
        ['data crossing over', 'direct reference', 'pickled both ways'],
        ['one crashes', 'can take all down', 'others survive'],
        ['startup cost', 'small', 'larger: measure'],
        ['CPU-bound on a GIL build', 'no speedup', 'can use every core'],
      ],
    },
  ],
  edges: [{ source: 'pool', target: 'compare', label: 'the trade-off' }],
}
