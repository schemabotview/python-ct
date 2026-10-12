import type { Scene } from '@graphlearning/flow'

// §4 — exploring a standard-library module from the prompt, and the standard modules grouped by the
// problem they solve. The last code line is the shadowing trap from §1 seen from the other side.
export const stdlibTour: Scene = {
  id: 'stdlib-tour',
  title: 'Find the module by what you need',
  flow: 'TB',
  nodes: [
    {
      id: 'explore',
      kind: 'code',
      filename: 'explore.py',
      label: `import statistics
statistics.mean([4.5, 8.0, 2.25])     # 4.916666666666667
statistics.median([4.5, 8.0, 2.25])   # 4.5
statistics.__all__[:2]                # ['NormalDist', 'StatisticsError']
help(statistics.median)               # prints its documentation
from collections import Counter
Counter(["tea", "mug", "tea"]).most_common(1)   # [('tea', 2)]`,
    },
    {
      id: 'purposes',
      kind: 'table',
      label: 'Standard modules by purpose',
      headers: ['I need to...', 'Look at'],
      values: [
        ['read and write data', 'csv, json'],
        ['work with paths and files', 'pathlib, shutil'],
        ['handle dates and time zones', 'datetime, zoneinfo'],
        ['do exact or statistical maths', 'decimal, statistics'],
        ['count, group, combine', 'collections, itertools'],
        ['match and wrap text', 're, textwrap'],
      ],
    },
  ],
  edges: [{ source: 'explore', target: 'purposes', label: 'where to look' }],
}
