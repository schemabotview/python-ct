import type { Scene } from '@graphlearning/flow'

// §8 — what this build reports about itself, and a table that separates what the language promises, what
// CPython does, and what differs between GIL-enabled and free-threaded builds. No speedup figure is given
// for a free-threaded build: this environment ran a GIL-enabled build, so none was measured.
export const runtimeMatrix: Scene = {
  id: 'runtime-matrix',
  title: 'The GIL is a CPython detail',
  flow: 'TB',
  nodes: [
    {
      id: 'build',
      kind: 'code',
      filename: 'which build am I on?',
      label: `import sys, sysconfig
sysconfig.get_config_var("Py_GIL_DISABLED")   # False here: a GIL-enabled build
sys._is_gil_enabled()                          # True here
# per CPython's documentation (not run here): a free-threaded build reports
# Py_GIL_DISABLED as 1, and its GIL can be switched back on by an extension
# that does not support running without it`,
    },
    {
      id: 'matrix',
      kind: 'table',
      label: 'Threads running Python code',
      headers: ['Build', 'CPU-bound threads', 'I/O-bound threads'],
      values: [
        ['CPython with the GIL', 'one runs at a time', 'overlap while waiting'],
        ['CPython, free-threaded', 'can run in parallel', 'overlap while waiting'],
        ['other implementations', 'differs: check its docs', 'differs'],
      ],
    },
  ],
  edges: [{ source: 'build', target: 'matrix', label: 'what it means' }],
}
