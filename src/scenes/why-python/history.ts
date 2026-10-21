import type { Scene, SceneNode } from '@graphlearning/flow'

const when = (id: string, label: string, sub: string, icon = 'calendar'): SceneNode => ({ id, label, sub, icon })
const era = (id: string, badge: string, label: string, sub: string, pattern: SceneNode['pattern'], children: SceneNode[]): SceneNode =>
  ({ id, badge, label, sub, pattern, icon: 'none', cols: 3, align: 'start', children: children.map((c) => ({ ...c, pattern })) })

export const history: Scene = {
  id: 'python-history',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'eras',
      label: 'Three eras',
      bare: true,
      children: [
        era('origins', '1', 'Origins', '1989 – 2000', 'service', [
          when('start', 'December 1989', 'Guido van Rossum starts Python at CWI in Amsterdam, as a holiday project'),
          when('first', 'February 1991', 'Version 0.9.0: classes, exceptions, functions, lists, dicts and strings'),
          when('one', 'January 1994', 'Python 1.0: lambda, map, filter and reduce arrive'),
        ]),
        era('two', '2', 'Python 2', '2000 – 2020', 'storage', [
          when('v2', 'October 2000', 'Python 2.0: list comprehensions and a cycle-collecting garbage collector'),
          when('psf', 'March 2001', 'The Python Software Foundation is formed to own the language'),
          when('eol', 'January 2020', 'Python 2 reaches end of life; its last release, 2.7.18, ships in April'),
        ]),
        era('three', '3', 'Python 3', '2008 – today', 'network', [
          when('v3', 'December 2008', 'Python 3.0: a deliberate break with Python 2, to fix text and division'),
          when('council', '2018 – 2019', 'Guido steps down as lead; an elected Steering Council takes over'),
          when('yearly', 'October 2020', 'Python 3.9, the first of one release every October (PEP 602)'),
          when('fast', 'October 2022', 'Python 3.11: the Faster CPython work lands, about 25% faster'),
          when('nogil', 'October 2024', 'Python 3.13: an experimental build without the GIL, and a JIT'),
          when('now', 'October 2025', 'Python 3.14: the free-threaded build is officially supported'),
        ]),
      ],
    },
    {
      id: 'side',
      label: 'The break, and the name',
      bare: true,
      children: [
    {
      id: 'gap',
      label: 'The gap it filled',
      sub: 'at CWI, for the Amoeba operating system project',
      pattern: 'user',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'shell', label: 'Shell scripts', sub: 'quick to write, too weak for real programs', icon: 'terminal', pattern: 'user' },
        { id: 'python', label: 'Python', sub: "ABC's readability, open and extensible", icon: 'python', pattern: 'user' },
        { id: 'c', label: 'C', sub: 'powerful, but slow to write and debug', icon: 'cpu', pattern: 'user' },
        { id: 'abc', kind: 'note', pattern: 'user', span: 'all', label: 'ABC: the readable teaching language Guido had helped build at CWI — but closed, and impossible to extend' },
      ],
    },
    {
      id: 'break',
      kind: 'table',
      label: 'What the Python 3 break changed',
      headers: ['', 'Python 2', 'Python 3'],
      values: [
        ['printing', 'print "total"', 'print("total")'],
        ['division', '7 / 2  →  3', '7 / 2  →  3.5'],
        ['text', 'str is bytes', 'str is Unicode'],
        ['integers', 'int and long', 'one int, any size'],
        ['user input', 'raw_input()', 'input()'],
      ],
    },
        { id: 'name', kind: 'note', pattern: 'service', label: "Named after Monty Python's Flying Circus, the comedy series — not the snake" },
      ],
    },
  ],
  edges: [],
}
