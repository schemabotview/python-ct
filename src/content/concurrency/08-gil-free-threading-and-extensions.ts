import type { Section } from '../types'

// Closes the chapter and carries the bridge into Chapter 11. Everything about a free-threaded build is conceptual: this environment ran a GIL-enabled build, so no free-threaded speedup was measured and none is claimed. The GIL is labelled a CPython implementation detail.
export const gilFreeThreadingAndExtensions: Section = {
  id: 'gil-free-threading-and-extensions',
  title: "CPython, the GIL, free-threaded builds, and extension compatibility",
  scene: 'runtime-matrix',
  focus: 'build',
  slide: `## The GIL and free-threaded builds

### What the GIL is
- A lock in **CPython** letting **one thread** run Python code at a time
- An **implementation detail**, not part of the Python language
- Waiting threads release it: I/O threads still help

### Which build?
- \`sysconfig.get_config_var("Py_GIL_DISABLED")\`: \`False\` here
- \`sys._is_gil_enabled()\`: \`True\` here

### Free-threaded builds
- CPython built **without** the GIL: CPU-bound threads **can** run in parallel
- **Not** available here: no speedup claimed
- Some **extensions** may re-enable the GIL if they do not support it

### Practical advice
- Test on **your** build; keep your locks`,
  narration:
    "We can now explain the result from section one, where CPU-heavy work gained nothing from threads. CPython, the standard implementation, has a global interpreter lock, the GIL. Only one thread at a time may run Python bytecode, so threads doing computation take turns instead of running in parallel. A waiting thread releases the lock, which is why threads still help I O bound work, as we measured. The GIL is a detail of CPython, not part of the Python language. Other implementations make different choices, and the language definition does not promise it. Recent versions of CPython can also be built as free-threaded builds, without the GIL, where CPU-bound threads can run in parallel on separate cores. You can ask which kind you have. In the card, sysconfig dot get config var of Py GIL disabled is False, and sys dot is gil enabled is True, so the machine used for this course ran a GIL-enabled build. That is important: I could not measure a free-threaded build, so I make no claim about how much faster it is. Treat any speedup figure with suspicion until you have measured it on your own workload. According to CPython's documentation, which I could not run here, a free-threaded build can also switch the GIL back on, for instance if you load a C extension that has not declared support for running without it, so extension compatibility matters. The table sums it up. With the GIL, CPU-bound threads run one at a time. Without it, they can run in parallel. In both cases, I O bound threads overlap while waiting. And the practical advice is to test on the build you will deploy, and keep your locks. A missing GIL does not make shared state safe. It makes unsafe code fail more often. We now have a toolbox of execution models, and each adds complexity. Next, we combine correctness, diagnosis, performance, and distribution into one coherent program.",
}
