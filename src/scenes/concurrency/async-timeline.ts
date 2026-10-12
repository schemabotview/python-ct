import type { Scene } from '@graphlearning/flow'

// §5 — sequential awaits against gather, and the demonstration that a blocking call stops every other
// coroutine: the table gives the time at which a four-tick coroutine ran, with and without a blocking
// call alongside. Times are rounded to 0.1 s.
export const asyncTimeline: Scene = {
  id: 'async-timeline',
  title: 'One thread, many waits',
  flow: 'TB',
  nodes: [
    {
      id: 'aw',
      kind: 'code',
      filename: 'async.py',
      label: `async def fetch(name, s):
    await asyncio.sleep(s)             # yields control to the event loop
    return name

await fetch("a", .2); await fetch("b", .2)           # one after another: 0.4 s
await asyncio.gather(fetch("c", .2), fetch("d", .2)) # overlapping:        0.2 s
fetch("x", .2)                         # a coroutine object: NOTHING has run yet
asyncio.run(main())                    # starts the loop; not allowed inside a running loop`,
    },
    {
      id: 'ticks',
      kind: 'table',
      label: 'When a ticker coroutine ran (seconds)',
      headers: ['Other coroutine', '1st tick', '2nd', '3rd', '4th'],
      values: [
        ['await asyncio.sleep(0.3)', '0.0', '0.1', '0.1', '0.2'],
        ['time.sleep(0.3): blocks the loop', '0.0', '0.3', '0.4', '0.4'],
      ],
    },
  ],
  edges: [{ source: 'aw', target: 'ticks', label: 'blocking stops the loop' }],
}
