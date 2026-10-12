import type { Scene } from '@graphlearning/flow'

// §1 — one measured I/O-bound comparison (four 0.2 s waits), the CPU-bound result on a GIL-enabled build,
// and a table that keys the choice to what the work spends its time on. Timings are rounded to 0.1 s
// because exact numbers vary run to run and machine to machine.
export const workloadKinds: Scene = {
  id: 'workload-kinds',
  title: 'Waiting versus computing',
  flow: 'TB',
  nodes: [
    {
      id: 'measured',
      kind: 'code',
      filename: 'workloads.py  (CPython 3.13, GIL enabled, 4 CPUs)',
      label: `def wait(name, s=0.2):
    time.sleep(s)                  # stands in for a network or disk wait
    return name

[wait(n) for n in "abcd"]          # one after another:   0.8 s
with ThreadPoolExecutor(4) as ex:
    list(ex.map(wait, "abcd"))     # overlapping waits:   0.2 s

def burn(n=2_000_000): return sum(i * i for i in range(n))
# four burn() calls in 4 threads took about the same time as in a loop (ratio 1.1)`,
    },
    {
      id: 'kinds',
      kind: 'table',
      label: 'Where does the time go?',
      headers: ['Work', 'Time is spent', 'Overlap helps?'],
      values: [
        ['downloading, querying', 'waiting', 'yes: threads or async'],
        ['reading many files', 'waiting on disk', 'often, measure'],
        ['hashing, parsing, maths', 'computing', 'needs more than one CPU core'],
        ['a tiny task', 'starting the work', 'no: overhead dominates'],
      ],
    },
  ],
  edges: [{ source: 'measured', target: 'kinds', label: 'choose by workload' }],
}
