import type { Section } from '../types'

// The unprotected n += 1 gave exactly 800000 on this GIL build, so the section teaches that it is 'not guaranteed' and shows the bytecode steps; it does NOT claim it fails. Queue.put timeout, put_nowait and semaphore peak were all run.
export const racesSynchronizationAndBackpressure: Section = {
  id: 'races-synchronization-and-backpressure',
  title: "Shared-state races, synchronization, bounded work, and backpressure",
  scene: 'bounded-work',
  focus: 'bounded',
  slide: `## Races, synchronization, and backpressure

### Races
- \`n += 1\` compiles to **load, add, store**: a switch can land between
- In one run, four threads added 200 000 each and got exactly 800 000
- A passing run **proves nothing**; nothing prevents a bad interleaving

### Safe patterns
- Hold a **lock** around read-modify-write
- Pass data through a **Queue**: it locks internally
- Prefer state owned by **one** thread

### Bounded work
- \`Queue(maxsize=2)\`: \`put\` waits when full; \`put_nowait\` raises \`queue.Full\`
- A full queue is **backpressure**: slow consumers slow producers
- \`BoundedSemaphore(2)\`: at most two inside; peak was **2**`,
  narration:
    "We saw a lost update in section two. Here is the honest complication. I ran the plain counter plus-equals one in four threads, two hundred thousand times each, with no lock, and the total was exactly eight hundred thousand. It did not fail on that run. That does not make it safe. The statement compiles to separate steps: load the global, load the number, add, and store the result, and a thread switch can land between any of them. Whether it does depends on timing, the build, and the version, so a passing run proves nothing, and nothing in the language prevents a bad interleaving. The table groups the situations. A read, modify, write sequence is not guaranteed safe. A single list append showed no lost items in forty thousand, but that is an implementation behaviour, not a promise to rely on. A queue between threads is safe, because it locks internally, and state owned by a single thread is safe because nothing is shared. So the habits are: hold a lock around read-modify-write sequences, pass data through queues, and prefer data owned by one thread. The second idea is bounding work. Without limits, a fast producer can pile up work faster than a slow consumer handles it, using unlimited memory. A queue with a maximum size fixes that. When it is full, put waits, or fails with queue dot Full if you give a timeout or use put no wait. This is called backpressure: a slow consumer slows the producer down. A bounded semaphore limits how many workers may be inside a section at once. Six threads were started, and the peak number inside was two. Async code has the same tools, with an async queue and an async semaphore. Next, why all of this depends on which Python you run.",
}
