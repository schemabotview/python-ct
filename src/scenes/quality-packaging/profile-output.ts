import type { Scene } from '@graphlearning/flow'

// §4 — timing a snippet and profiling a program, and how to read the profile. The profile is one real
// run of main() (5 slow() calls and 100 fast() calls); the call counts are exact and repeatable, the
// seconds are specific to this machine and one run.
export const profileOutput: Scene = {
  id: 'profile-output',
  title: 'Measure before you optimise',
  flow: 'TB',
  nodes: [
    {
      id: 'measure',
      kind: 'code',
      filename: 'measuring.py',
      label: `timeit.timeit("sum(range(1000))", number=1000)   # seconds for 1000 runs
min(timeit.repeat("sum(range(1000))", number=100, repeat=3))   # best of 3: least noise

pr = cProfile.Profile(); pr.enable(); main(); pr.disable()
pstats.Stats(pr).sort_stats("cumulative").print_stats(4)

#    ncalls  tottime  percall  cumtime  filename:lineno(function)
#         1    0.000    0.000    0.313  main
#         5    0.000    0.000    0.313  slow
#       105    0.170    0.002    0.313  {built-in method builtins.sum}
#   1000005    0.143    0.000    0.143  <genexpr>`,
    },
    {
      id: 'reading',
      kind: 'table',
      label: 'Reading a profile',
      headers: ['Column', 'Meaning', 'Look for'],
      values: [
        ['ncalls', 'times called', 'huge counts'],
        ['tottime', 'time in the function itself', 'the biggest'],
        ['cumtime', 'time including its callees', 'which path is slow'],
      ],
    },
  ],
  edges: [{ source: 'measure', target: 'reading', label: 'interpreting it' }],
}
