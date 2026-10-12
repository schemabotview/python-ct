import type { Section } from '../types'

// The lost update is shown as a deterministic trace because a real unforced race on a GIL build is unreliable; the forced-interleaving run (read, switch, write) is what produced 201 of 400. Exact counts vary per run and are not promised.
export const threadsAndSharedMemory: Section = {
  id: 'threads-and-shared-memory',
  title: "Threads, shared memory, and coordination responsibilities",
  scene: 'thread-race',
  focus: 'trace',
  slide: `## Threads and shared memory

A **thread** runs code inside the **same process**: all threads share memory.

### Using threads
- \`Thread(target=fn, args=...)\`, then \`start()\` and \`join()\`
- An error in a thread prints a traceback but **does not stop** main
- A **daemon** thread is abandoned when the program exits

### The hazard
- \`counter += 1\` is **read, add, write**: three steps
- A switch between them **loses an update**
- With a switch forced there, two threads adding 200 each reached about **201**, not 400

### Coordination
- \`Lock\`: \`with lock:\` lets one thread in at a time
- \`Event\`: one thread waits until another sets it
- \`threading.local\`: separate values per thread`,
  narration:
    "A thread is a path of execution inside a single process, and every thread in a process shares the same memory. That makes sharing data easy, and it is also the source of the main danger. You start a thread with Thread, giving it a target function and arguments, call start, and later call join to wait for it to finish. If a thread raises an exception, Python prints the traceback, but only that thread ends. The main program carries on, so you must collect results and errors deliberately. A daemon thread is one that Python abandons when the program exits. Now the hazard. The statement counter plus-equals one looks like one step, but it is three: read the value, add one, write it back. The table traces two threads. Thread A reads zero. Thread B also reads zero. Thread A writes one. Thread B writes one. Two increments happened, but the counter says one. An update was lost. In the first run I forced a thread switch between the read and the write, and two threads each adding two hundred ended near two hundred and one, not four hundred. The exact number changes each run, which is the nature of a race condition: the result depends on timing. The fix is coordination. A lock lets only one thread into a protected section at a time, so the read, add, and write cannot be interleaved. The same test with a lock gave four hundred. An event lets one thread wait until another signals it. And thread local storage gives each thread its own private value. The responsibility for all of this is yours: threads share memory, and nothing protects it automatically. Next, processes, which do not share it.",
}
