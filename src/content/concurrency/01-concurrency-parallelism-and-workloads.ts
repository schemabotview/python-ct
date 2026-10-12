import type { Section } from '../types'

// Opens the chapter by separating two ideas and two kinds of work before any tool is introduced. Timings are rounded to 0.1 s and the build is stated in the scene because they depend on it; no universal speedup is claimed.
export const concurrencyParallelismAndWorkloads: Section = {
  id: 'concurrency-parallelism-and-workloads',
  title: "Concurrency versus parallelism; I/O-bound versus CPU-bound work",
  scene: 'workload-kinds',
  focus: 'measured',
  slide: `## Concurrency, parallelism, and workloads

### Two ideas
- **Concurrency**: several tasks **in progress** at once
- **Parallelism**: several tasks **running at the same instant**, on separate cores
- Concurrency does not need parallelism

### Two kinds of work
- **I/O-bound**: mostly **waiting** for a network, disk or service
- **CPU-bound**: mostly **computing**

### What was measured
- Four 0.2 s waits: 0.8 s in a loop, **0.2 s** in four threads
- Four CPU-heavy calls: **no gain** from threads on this GIL-enabled build

### Choose by workload
- Measure first; a tiny task can cost more to start than to run`,
  narration:
    "Programs often have to do several things at once, and two words describe different ideas. Concurrency means several tasks are in progress at the same time, even if only one is actually executing at any instant. Parallelism means several tasks are genuinely running at the same instant, on separate processor cores. You can have concurrency without parallelism: one cook can have several dishes underway, switching between them while something simmers. Which approach helps depends on what the work spends its time doing. I O bound work spends most of its time waiting: for a network reply, a disk, or a database. CPU bound work spends its time computing, such as hashing, parsing, or number crunching. The code card measures the first kind. The function wait sleeps for two tenths of a second, standing in for a network call. Running four of them one after another takes eight tenths of a second. Running them in four threads takes two tenths, because the waits overlap, and a waiting thread is not using the processor. Now the second kind. Four calls of a function that does heavy arithmetic took about the same time in four threads as in a plain loop. That result was measured on a GIL-enabled build of CPython three point thirteen with four cores, and section eight explains why it depends on the build. The table keys the choice to where time goes. Waiting favours threads or async. Computing needs more than one core doing real work at once. And a tiny task can cost more to hand off than to run, so overlap does not help. All the figures here are rounded and vary between runs and machines, so the habit to take away is to measure with your own workload. Next, threads and what they share.",
}
