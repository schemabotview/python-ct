import type { Section } from '../types'

// Output is from a real run at INFO. The eager-argument point (an expression passed to log.debug is still evaluated) was verified; lazy %-style formatting avoids formatting cost but not argument evaluation. Handlers and propagation are mentioned, not taught in depth.
export const loggingLevelsAndContext: Section = {
  id: 'logging-levels-and-context',
  title: "Logging levels, context, and useful operational signals",
  scene: 'logging-flow',
  focus: 'code',
  slide: `## Logging levels and context

\`print\` shows a value; **logging** records an event with a level, a time and a source.

### Levels
- DEBUG 10 · INFO 20 · WARNING 30 · ERROR 40 · CRITICAL 50
- The **threshold** decides what is shown: at INFO, DEBUG is dropped

### Loggers
- \`logging.getLogger("orders.import")\`: one per module
- Names form a **hierarchy**: \`orders\` governs \`orders.import\`

### Useful records
- \`log.info("read %d rows", 5)\`: pass values as arguments
- \`log.exception("could not parse")\` adds the **traceback**
- Name the **row or id**: context makes a signal`,
  narration:
    "A print statement shows a value, but it has no level, no timestamp, and no way to be switched off without editing code. The logging module records events with a level, a source, and a message, and lets you control what is shown from one place. There are five levels, with numbers: debug, ten, for detail useful when diagnosing; info, twenty, for normal milestones; warning, thirty, when something is odd but the program continues; error, forty, when an operation failed; and critical, fifty, when the program cannot continue. You set a threshold, and anything below it is dropped. In the card, the program is configured at info, so the debug message is not shown, the info message about reading five rows is, and so is the warning about the rejected row. Choose the level by who needs to notice the event, not by how you feel about it. Each module gets a logger of its own, named for the module, such as orders dot import. Logger names form a hierarchy with dots, so setting the level on orders affects everything beneath it. Configure the output once, at your program's entry point, with basic config, and have libraries only create loggers. How you write a record matters. Pass values as arguments after a message with percent placeholders, rather than building the string yourself. And a caution I confirmed: an expression you pass as an argument is still evaluated even if the level is switched off, so avoid expensive calculations inside a debug call. The exception method, used inside an except block, records the message and the full traceback at error level. Most important is context. A warning that says row A one thousand two was rejected, with the reason, can be acted on, while one that says bad data cannot. Next, finding out why a program is slow.",
}
