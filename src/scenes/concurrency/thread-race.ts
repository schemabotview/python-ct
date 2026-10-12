import type { Scene } from '@graphlearning/flow'

// §2 — threads started and joined, an exception that ends only its own thread, and a lost update. The
// trace table is the interleaving that produces the loss; the run with a forced switch between read and
// write printed 201 where 400 was expected (the exact figure varies per run).
export const threadRace: Scene = {
  id: 'thread-race',
  title: 'Threads share memory',
  flow: 'TB',
  nodes: [
    {
      id: 'threads',
      kind: 'code',
      filename: 'threads.py',
      label: `ts = [Thread(target=worker, args=(i,)) for i in range(3)]
for t in ts: t.start()
for t in ts: t.join()              # wait for each to finish
# an exception in a thread prints a traceback but does NOT stop main

lock = Lock()
def bump(n):
    global counter
    for _ in range(n):
        with lock:                 # only one thread inside at a time
            counter += 1`,
    },
    {
      id: 'trace',
      kind: 'table',
      label: 'A lost update: counter += 1 in two threads',
      headers: ['step', 'Thread A', 'Thread B', 'counter'],
      values: [
        ['1', 'reads counter (0)', '', '0'],
        ['2', '', 'reads counter (0)', '0'],
        ['3', 'writes 0 + 1', '', '1'],
        ['4', '', 'writes 0 + 1', '1: one update lost'],
      ],
    },
  ],
  edges: [{ source: 'threads', target: 'trace', label: 'why a lock is needed' }],
}
