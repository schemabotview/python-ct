import type { Item, SceneModel } from '@graphlearning/graphl-flow'

// §2 — where Python came from, in three eras. Dates are from the CPython docs and PEPs (not
// measured); 3.15.0 shipped 2026-10-09 after a third release candidate.
const when = (id: string, title: string, sub: string): Item => ({ type: 'item', id, title, sub, icon: 'clock' })

export const history: SceneModel = {
  title: 'Where Python came from',
  sub: 'a holiday project in 1989; a new release every October since 2020',
  dir: 'row',
  nodes: [
    {
      type: 'group', id: 'origins', badge: 1, title: 'Origins', sub: '1989 – 2000', tone: 'source', children: [
        when('start', 'December 1989', 'Guido van Rossum starts Python at CWI, Amsterdam'),
        when('first', 'February 1991', '0.9.0: classes, exceptions, functions, lists, dicts'),
        when('one', 'January 1994', '1.0: lambda, map, filter and reduce'),
        { type: 'note', id: 'name', text: 'Named after Monty Python’s Flying Circus, not the snake.' },
      ],
    },
    {
      type: 'group', id: 'two', badge: 2, title: 'Python 2', sub: '2000 – 2020', tone: 'serve', children: [
        when('v2', 'October 2000', '2.0: list comprehensions, a cycle-collecting garbage collector'),
        when('psf', 'March 2001', 'the Python Software Foundation is formed'),
        when('v3', 'December 2008', '3.0: a deliberate break, to fix text and division'),
        when('eol', 'January 2020', 'Python 2 reaches end of life'),
      ],
    },
    {
      type: 'group', id: 'three', badge: 3, title: 'Python 3', sub: '2008 – today', tone: 'ingest', children: [
        when('council', '2018 – 2019', 'Guido steps down; an elected Steering Council takes over'),
        when('yearly', 'October 2020', '3.9: the first of one release every October'),
        when('fast', 'October 2022', '3.11: Faster CPython — about 25% faster on average'),
        when('nogil', 'October 2024', '3.13: an experimental build without the GIL'),
        when('now', 'October 2025', '3.14: the free-threaded build is supported'),
        { type: 'item', id: 'next', title: 'October 2026', sub: '3.15: lazy imports, frozendict, UTF-8 by default — this course', icon: 'python', tone: 'store' },
      ],
    },
  ],
  edges: [{ from: 'origins', to: 'two' }, { from: 'two', to: 'three' }],
}
