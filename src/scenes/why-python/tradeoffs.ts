import type { Scene } from '@graphlearning/flow'

// The terminal pane is a real run (CPython 3.13, x86-64, 4 CPUs). The ratio is what this machine
// measured, not a universal speedup — the narration says so.
const TIMING = [
  '$ python -m timeit -s "nums = list(range(1_000_000))" \\',
  '      "total = 0" "for n in nums: total += n"',
  '20 loops, best of 5: 18.3 msec per loop',
  '',
  '$ python -m timeit -s "nums = list(range(1_000_000))" "sum(nums)"',
  '50 loops, best of 5: 3.9 msec per loop',
].join('\n')

export const tradeoffs: Scene = {
  id: 'python-tradeoffs',
  header: 'band',
  nodes: [
    {
      id: 'top',
      label: 'Where it fits, and why',
      bare: true,
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'fit',
          kind: 'table',
          label: 'Where Python fits',
          headers: ['job', 'Python', 'why'],
          values: [
            ['automation and glue', 'strong', 'short code, large standard library'],
            ['data analysis and ML', 'strong', 'NumPy, pandas, PyTorch run in C'],
            ['data pipelines', 'strong', 'readable, rich connectors and tools'],
            ['web back ends', 'good', 'Django, FastAPI; Go or Java at huge scale'],
            ['tight loops in pure Python', 'slow', 'push the loop into C, or use Rust'],
            ['mobile apps', 'weak', 'Kotlin and Swift own the platforms'],
            ['in the browser', 'not native', 'JavaScript and TypeScript'],
          ],
        },
        {
          id: 'lesson',
          kind: 'list',
          icon: 'zap',
          label: 'Fast where it counts',
          pattern: 'service',
          items: [
            'The loop runs one bytecode instruction at a time',
            'sum() does the same work in compiled C',
            'Fast Python code hands its inner loops to C',
          ],
        },
      ],
    },
    { id: 'timing', kind: 'terminal', filename: 'Terminal — the same sum, two ways', label: TIMING, span: 'all' },
  ],
  edges: [],
}
