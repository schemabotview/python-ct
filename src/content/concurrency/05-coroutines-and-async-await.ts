import type { Section } from '../types'

// Cooperative scheduling is demonstrated, not asserted: the ticker times with and without a blocking call were measured. The 'forgot to await' case produces no error at all in the run, only a warning, so it is described as a silent bug.
export const coroutinesAndAsyncAwait: Section = {
  id: 'coroutines-and-async-await',
  title: "Coroutines, async/await, event loops, and cooperative scheduling",
  scene: 'async-timeline',
  focus: 'aw',
  slide: `## Coroutines and async/await

### The model
- \`async def\` defines a **coroutine function**; calling it returns a **coroutine object**
- One **event loop** runs on **one thread**

### Cooperative scheduling
- \`await\` is where a coroutine **yields** so others can run
- Awaited one after another: 0.4 s; with \`gather\`: **0.2 s**

### The rule
- Never call a **blocking** function inside a coroutine
- It stops **every** coroutine: ticks slipped
- \`asyncio.to_thread(fn)\` moves blocking work to a thread

### Pitfalls
- A coroutine called but not awaited **never runs**
- \`asyncio.run()\` cannot run inside a loop`,
  narration:
    "Async programming is a different way to overlap waiting, using one thread. A function defined with async def is a coroutine function. Calling it does not run the body. It returns a coroutine object, a suspended computation, and nothing happens until something awaits it or schedules it. An event loop runs the coroutines, on a single thread. The key idea is cooperative scheduling. A coroutine runs until it reaches an await, and there it voluntarily hands control back to the loop, which can run another coroutine in the meantime. The first call in the card awaits fetch a, and then fetch b, one after another, so it takes four tenths of a second. Passing both to gather lets the loop start both, and while each is waiting, the loop runs the other, so it takes two tenths. This is concurrency without parallelism and without any extra thread. It also means the loop is only as responsive as its least cooperative coroutine. The table measures that. A ticker coroutine wakes four times, every fifty milliseconds. While another coroutine awaits a sleep, the ticks arrive about when expected. But when the other coroutine calls the ordinary blocking time dot sleep, the whole loop freezes, and the ticks slip to zero, three tenths, and then later. So never call blocking functions inside a coroutine. If you must, asyncio dot to thread runs a function in a worker thread and lets you await it. Two pitfalls. Calling a coroutine without awaiting it does nothing: the program carries on, perhaps with only a warning, and the work never happens. And asyncio dot run starts the loop, so calling it from inside a running loop raises a RuntimeError. Next, controlling and stopping async work.",
}
