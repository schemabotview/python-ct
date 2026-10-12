import type { Section } from '../types'

// Context managers are used here, not built: the protocol behind with belongs to Chapter 8. The failure case is shown by actually raising inside the block and then checking f.closed.
export const withAndDeterministicCleanup: Section = {
  id: 'with-and-deterministic-cleanup',
  title: "Using with for deterministic resource cleanup",
  scene: 'with-cleanup',
  focus: 'code',
  slide: `## with and deterministic cleanup

### The problem
- A file left open can lose buffered data and stay locked
- Waiting for garbage collection is **not** deterministic

### The solution
- \`with open(...) as f:\` closes the file when the block ends
- It closes on success **and** when the block raises
- \`f.closed\` is \`True\` afterwards

### More than one
- \`with open(a) as src, open(b, "w") as dst:\` handles several

### Not only files
- Locks, connections and temporary folders use \`with\` too
- Chapter 8 shows how to build your own`,
  narration:
    "Closing files by hand has two problems. First, it is easy to forget. Second, if an error occurs between open and close, the close line never runs. A file left open can lose data that was still buffered, and on some systems it stays locked. You might think Python will tidy up when the file object is no longer used, but when that happens is not something you can rely on, so it is not deterministic. The with statement solves it. You write with, then open, then as, and a name, and the indented block that follows can use the file. When the block ends, Python closes the file, and it does so whether the block finished normally or raised an exception. The code card shows both. The first with block reads and prints the lines, and afterwards f dot closed is True. The second raises a RuntimeError inside the block on purpose, catches it outside, and f dot closed is still True. The diagram shows the guarantee: after the file opens, the block either finishes or raises, and in both cases, the file ends up closed. You can open several files in one with statement, separated by commas, which is handy for copying from one file to another. And with is not only for files. Locks, database connections and temporary folders all use it to guarantee cleanup, and in Chapter 8 you will see how to write your own. From now on, every file in this course is opened with with. Next, two formats for structured data.",
}
