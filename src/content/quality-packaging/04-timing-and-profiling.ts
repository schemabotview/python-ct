import type { Section } from '../types'

// The profile is a single real run; call counts are exact and repeatable but every duration is machine- and run-specific, which the slide and narration say. No optimisation is claimed to be faster than a stated baseline because none is measured here beyond the profile itself.
export const timingAndProfiling: Section = {
  id: 'timing-and-profiling',
  title: "Timing and profiling: baselines, bottlenecks, and measurement limits",
  scene: 'profile-output',
  focus: 'measure',
  slide: `## Timing and profiling

**Measure first**: guesses about speed are often wrong.

### Timing a snippet
- \`timeit.timeit(stmt, number=N)\` runs it many times
- \`timeit.repeat\` then take the **minimum**: the least noise
- \`time.perf_counter()\` times a section of a program

### Profiling a program
- \`cProfile\` records **every call** and its time
- \`ncalls\`: how many times; \`tottime\`: time **inside** the function
- \`cumtime\`: time **including** what it calls

### Limits
- Seconds depend on the machine and the run: call counts do not
- Profiling **slows** the program, so compare shares, not totals
- Record a **baseline** before changing anything, and re-measure after`,
  narration:
    "Before making a program faster, find out where the time goes, because intuition about performance is often wrong. To time a small snippet, the timeit module runs it many times and reports the total in seconds. Running it several times with repeat, and taking the minimum, gives the figure least disturbed by whatever else the computer was doing. To time a section of a larger program, call time dot perf counter before and after. To find which parts of a whole program are slow, use a profiler. The cProfile module records every function call and how long it took. The card shows the result for a small program that calls a slow function five times and a fast one a hundred times. The columns are in the table. N calls is how many times a function ran. Tot time is the time spent inside the function itself, excluding what it called. Cum time is cumulative, including everything it called. In this run, the generator expression ran a million and five times, which is exact and repeatable, while the seconds, about a third of a second in total, are specific to this machine and this run. Notice how the profile answers a question: nearly all the time is under slow, and inside it, in summing a generator of a million items, so that is where an improvement would count. Two cautions. Profiling itself slows a program, so compare the share of time each function takes, not the absolute totals. And always record a baseline measurement before changing anything, then measure again afterwards, so you know whether the change helped. Next, why some choices are fast and some are not.",
}
