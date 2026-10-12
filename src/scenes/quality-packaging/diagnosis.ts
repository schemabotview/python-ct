import type { Scene } from '@graphlearning/flow'

// §2 — a real traceback, the debugger commands that inspect it, and what assert does and does not
// guarantee (python -O removes it). The post-mortem banner and frame lines were copied from running
// python -m pdb on dbg.py.
export const diagnosis: Scene = {
  id: 'diagnosis',
  title: 'Reproduce, read, inspect, fix',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'code',
      filename: 'dbg.py  and  python -m pdb dbg.py',
      label: `def avg(xs):
    total = sum(xs)
    return total / len(xs)
avg([])

# ZeroDivisionError: division by zero              <- read the LAST line first
# Uncaught exception. Entering post mortem debugging
# > dbg.py(3)avg()
# -> return total / len(xs)                        <- where it stopped
# (Pdb) p xs        # []   p total   # 0

def avg(xs):
    assert xs, "avg() needs at least one value"    # a check for programmers`,
    },
    {
      id: 'cmds',
      kind: 'table',
      label: 'Debugger commands',
      headers: ['Command', 'Does'],
      values: [
        ['p expr', 'print a value'],
        ['n  /  s', 'next line  /  step into a call'],
        ['c', 'continue to the next stop'],
        ['w  /  l', 'where am I  /  list nearby code'],
        ['q', 'quit'],
      ],
    },
  ],
  edges: [{ source: 'trace', target: 'cmds', label: 'inspect, then fix' }],
}
