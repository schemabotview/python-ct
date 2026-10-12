import type { Section } from '../types'

// The thread and process executors share one interface, so the section is taught on a thread pool and applies to both. All six Future rows were observed. as_completed versus map ordering is the main teaching contrast.
export const executorsAndFutures: Section = {
  id: 'executors-and-futures',
  title: "Executors, futures, submission, and result collection",
  scene: 'futures-flow',
  focus: 'collect',
  slide: `## Executors and futures

An **executor** manages a pool of workers. A **future** is a handle to work in progress.

### Submitting
- \`ex.submit(fn, *args)\` returns a **Future** immediately
- \`ThreadPoolExecutor\` and \`ProcessPoolExecutor\` share one interface

### Collecting
- \`f.result()\` waits for the answer, or **re-raises** its error
- \`as_completed(futs)\`: results in **finish** order
- \`ex.map(fn, items)\`: results in **submission** order

### Limits
- \`result(timeout=...)\` raises \`TimeoutError\`; the work continues
- \`cancel()\` works only on work **not yet started**

### Lifetime
- \`with\` waits for the work, then shuts the pool down
- \`submit\` after shutdown raises \`RuntimeError\``,
  narration:
    "Managing threads and processes by hand gets tedious, so the standard library provides executors. An executor owns a pool of workers and takes work from you. The same interface covers both a thread pool and a process pool, so you can often switch by changing one name. You hand over work with submit, giving a function and its arguments, and it returns a Future immediately. A future is a handle to work in progress: the answer may not exist yet. Calling result on it waits until the work finishes, then returns the value, or re-raises the exception the function raised. So errors in a worker are not lost: they surface where you collect the result. There are three common ways to collect. Results one at a time with result. In order of completion, using as completed, which gave fast, then mid, then slow even though slow was submitted first. Or in submission order, using the executor's map method, which gave a, b, c. With map, if one item failed, the error appears when you reach that item. The table lists what else a future can tell you. Asking for a result with a timeout raises TimeoutError if it is not ready, but the work itself carries on. Cancel succeeds only for work that has not started yet: a queued future was cancelled, and a running one was not. Using the executor in a with block waits for submitted work and shuts the pool down, and submitting after shutdown raises a RuntimeError. Everything so far uses extra threads or processes. Next, a different model that uses neither for waiting.",
}
