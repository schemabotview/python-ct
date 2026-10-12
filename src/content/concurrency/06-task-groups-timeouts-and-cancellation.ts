import type { Section } from '../types'

// Every row of the table was run, including the two that surprise: shield keeps the inner task running after an outer timeout, and swallowing CancelledError lets a task finish anyway. TaskGroup and timeout need Python 3.11 or later; except* is 3.11+.
export const taskGroupsTimeoutsAndCancellation: Section = {
  id: 'task-groups-timeouts-and-cancellation',
  title: "Task groups, timeouts, cancellation, and cleanup",
  scene: 'cancellation',
  focus: 'group',
  slide: `## Task groups, timeouts, and cancellation

### TaskGroup
- \`async with asyncio.TaskGroup() as tg:\` owns its tasks
- One task fails: the others are **cancelled**, then the errors surface as an **ExceptionGroup**

### Cancellation
- \`task.cancel()\` raises \`CancelledError\` **inside** the task
- Clean up in \`finally\`; **re-raise** \`CancelledError\`
- Swallow it and the task **finishes anyway**

### Timeouts
- \`asyncio.timeout(s)\` cancels the block, then raises \`TimeoutError\`
- \`shield(t)\` protects \`t\` from an outer timeout

### Care
- \`gather\` raises the first error but leaves the **others running**
- \`return_exceptions=True\`: errors as values`,
  narration:
    "Starting async work is easy. Stopping it cleanly is the hard part, and Python gives you structured tools. A task group, from asyncio dot TaskGroup, owns the tasks created inside it, and the async with block does not finish until all of them are done. If one task fails, the group cancels its siblings, waits for them to clean up, and then raises the errors together as an ExceptionGroup, which you catch with except star. The code card shows exactly the order that printed: job two failed, so its cleanup ran, job one was cancelled, and then job one's cleanup ran. Cancellation works by raising a CancelledError inside the task at its current await. That means a task can clean up in a finally block, and the card's job prints its cleanup either way. The convention is to re-raise CancelledError, so cancellation completes. The table lists a surprise: if a task catches CancelledError and does not re-raise it, the task simply finishes, and the cancellation is ignored. In the run, the task printed swallowed and then returned finished anyway. Timeouts use the same mechanism. Asyncio dot timeout cancels the block when time runs out, and raises a TimeoutError, after the inner cleanup has run. Shield is the opposite: an outer timeout cancelled only the shield, and the inner task was still running and finished normally afterwards. And gather needs care. Without return exceptions, it raises the first error to you but leaves the other tasks running, which can surprise you, while return exceptions equals True hands every outcome back as a value. These tools need Python three point eleven or later. Next, sharing state safely, and not overloading things.",
}
