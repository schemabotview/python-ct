import type { Scene } from '@graphlearning/flow'

// §7 — a bounded queue and a semaphore. The unprotected n += 1 is shown by its bytecode steps rather than
// as a failing run: on this GIL build four threads added 200000 each and the total was exactly 800000,
// so a failure cannot be promised, only that nothing prevents one.
export const boundedWork: Scene = {
  id: 'bounded-work',
  title: 'Limit the work, and the shared state',
  flow: 'TB',
  nodes: [
    {
      id: 'bounded',
      kind: 'code',
      filename: 'bounded.py',
      label: `q = queue.Queue(maxsize=2)
q.put(1); q.put(2)
q.put(3, timeout=0.05)       # queue.Full: the producer must wait or give up
q.put_nowait(3)              # queue.Full at once

sem = threading.BoundedSemaphore(2)   # at most 2 threads inside at a time
with sem: ...                         # six threads ran; peak concurrency was 2
n += 1      # LOAD_GLOBAL n, LOAD_GLOBAL 1, BINARY_OP +, STORE_GLOBAL n`,
    },
    {
      id: 'safety',
      kind: 'table',
      label: 'Shared state: what protects it',
      headers: ['Situation', 'Safe without a lock?'],
      values: [
        ['read-modify-write, n += 1', 'not guaranteed'],
        ['one list.append (40000 total)', 'no lost items observed'],
        ['a Queue between threads', 'yes: it locks internally'],
        ['state owned by one thread only', 'yes: nothing is shared'],
      ],
    },
  ],
  edges: [{ source: 'bounded', target: 'safety', label: 'bounding and sharing' }],
}
