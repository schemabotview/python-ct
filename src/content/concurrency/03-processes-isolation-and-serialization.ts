import type { Section } from '../types'

// Pickling failures were run and their messages copied. The default start method differs by platform and Python version (fork was used here), so none is claimed for 3.14. Pool startup cost was not demonstrable here, so the slide says to measure.
export const processesIsolationAndSerialization: Section = {
  id: 'processes-isolation-and-serialization',
  title: "Processes, isolation, serialization, and startup/transfer costs",
  scene: 'process-boundary',
  focus: 'pool',
  slide: `## Processes, isolation, and serialization

A **process** has its **own memory**: nothing is shared by default.

### Crossing the boundary
- Arguments and results are **pickled**, sent, and unpickled
- The function must be **importable** by the worker: define it at the top level
- Guard the entry point: \`if __name__ == "__main__":\`

### What fails
- A lambda or local function: \`AttributeError: Can't get local object\`
- A lock: \`TypeError: cannot pickle '_thread.lock' object\`

### Costs and benefits
- Starting workers and copying data cost time: **measure**
- A crash in one worker leaves the others running
- The default start method differs by **platform and version**`,
  narration:
    "A process is an independent running program with its own memory. Two processes share nothing by default, which removes the shared memory hazards of threads, but it creates a different problem: moving data between them. When you give a process pool a function and arguments, Python pickles them, converts them to bytes, sends those bytes to the worker, and the worker unpickles them. Results travel back the same way. The code card shows it working. The function square is defined at the top level, so a worker can import it by name, and mapping it over five numbers returns zero, one, four, nine, and sixteen. Notice the if name equals main guard. On platforms where workers are started fresh, each worker imports your module, and without that guard it would start workers of its own. Now see what cannot cross the boundary. A lambda cannot be pickled by name, so submitting one fails with an AttributeError saying it can't get the local object. A lock is tied to the process that owns it, so pickling one raises a TypeError. Functions defined inside other functions fail the same way. The table compares threads and processes. Memory is shared for threads and separate for processes. Data crosses by reference for threads, but is pickled both ways for processes. A crashing thread can take the whole program down, while other processes survive a crashed worker. Starting workers and copying data cost time, which I could not turn into a general number, since it depends on the start method and the data, so measure for your workload. On a standard GIL build, processes are how CPU-bound Python code uses several cores. The default way of starting a worker differs between platforms and Python versions, and it was fork on the machine used here. Next, a friendlier interface to threads and processes.",
}
