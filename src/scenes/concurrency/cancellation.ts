import type { Scene } from '@graphlearning/flow'

// §6 — a TaskGroup where one job fails and the other is cancelled, with the cleanup order that printed,
// and the table of tools for stopping work. The shield and swallowed-cancel rows were each run.
export const cancellation: Scene = {
  id: 'cancellation',
  title: 'When one task fails, the group cancels the rest',
  flow: 'TB',
  nodes: [
    {
      id: 'group',
      kind: 'code',
      filename: 'taskgroup.py',
      label: `async def job(n, s, fail=False):
    try:
        await asyncio.sleep(s)
        if fail: raise ValueError(f"job {n} failed")
    except asyncio.CancelledError:
        print("job", n, "cancelled"); raise     # re-raise so cancellation completes
    finally:
        print("job", n, "cleanup")              # runs either way

try:
    async with asyncio.TaskGroup() as tg:
        tg.create_task(job(1, 0.5)); tg.create_task(job(2, 0.1, fail=True))
except* ValueError as eg: ...   # job 2 cleanup, job 1 cancelled, job 1 cleanup`,
    },
    {
      id: 'tools',
      kind: 'table',
      label: 'Tools for stopping or limiting work',
      headers: ['Tool', 'Behaviour'],
      values: [
        ['TaskGroup', 'one failure cancels its siblings'],
        ['asyncio.timeout(s)', 'cancels the block, raises TimeoutError'],
        ['task.cancel()', 'raises CancelledError inside the task'],
        ['catch CancelledError, no re-raise', 'the task finishes anyway'],
        ['asyncio.shield(t)', 'outer timeout leaves t running'],
        ['gather, no return_exceptions', 'first error raised; others keep running'],
      ],
    },
  ],
  edges: [{ source: 'group', target: 'tools', label: 'stopping work' }],
}
