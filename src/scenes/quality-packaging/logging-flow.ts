import type { Scene } from '@graphlearning/flow'

// §3 — a logger writing records at four levels, the output a run at INFO produced (DEBUG suppressed),
// and the numeric levels. log.exception() appends the traceback of the exception being handled.
export const loggingFlow: Scene = {
  id: 'logging-flow',
  title: 'Records, levels, and where they go',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'import_log.py',
      label: `logging.basicConfig(level=logging.INFO,
    format="%(levelname)s %(name)s: %(message)s")
log = logging.getLogger("orders.import")     # named for the module

log.debug("not shown at INFO")               # below the threshold: dropped
log.info("read %d rows", 5)                  # INFO orders.import: read 5 rows
log.warning("row %s rejected: %s", "A-1002", "qty is not a whole number")
try: int("x")
except ValueError: log.exception("could not parse")   # ERROR ... plus the traceback`,
    },
    {
      id: 'levels',
      kind: 'table',
      label: 'Levels, lowest to highest',
      headers: ['Level', 'Number', 'Use for'],
      values: [
        ['DEBUG', '10', 'detail for diagnosing'],
        ['INFO', '20', 'normal milestones'],
        ['WARNING', '30', 'something odd, program continues'],
        ['ERROR', '40', 'an operation failed'],
        ['CRITICAL', '50', 'the program cannot continue'],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'levels', label: 'the threshold decides' }],
}
