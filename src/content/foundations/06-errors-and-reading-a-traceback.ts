import type { Section } from '../types'

// Closes the chapter and carries the bridge to Chapter 2. The traceback shown is the real output of
// the order-total program given the text "three"; the exact wording of messages varies a little
// between Python versions, which the narration says out loud.
export const errorsAndReadingATraceback: Section = {
  id: 'errors-and-reading-a-traceback',
  title: 'Syntax errors, runtime errors, and reading a traceback',
  scene: 'error-kinds',
  focus: 'runtime',
  slide: `## Syntax errors, runtime errors, and tracebacks

### Three kinds of failure
- **Syntax error** — the text is not valid Python, so nothing runs
- **Runtime error** — valid text, but a statement fails while running
- **Wrong result** — it runs to the end with the wrong answer

### Reading a traceback
- Start at the **bottom**: the error type and its message
- The lines above name the file, the line number and the code
- With nested calls, the line nearest the bottom is closest to the failure

### Errors you will meet first
- \`NameError\` — a name has no object yet, often a typo
- \`TypeError\` — an operation on the wrong kind of object
- \`ValueError\` — right type, unacceptable value
- \`ZeroDivisionError\` — dividing by zero`,
  narration:
    "Programs fail, and a beginner's best skill is telling the three kinds of failure apart, so the diagram gives one worked example of each. The first is a syntax error. The text is not valid Python, so Python refuses to run any of it. For example, print with a string followed directly by a number, with no comma between them, is rejected, and Python even suggests that you might have forgotten a comma. The second is a runtime error. The text is valid, the program starts, and then one statement fails while running. Python stops and prints a traceback, which is the report on screen. Read a traceback from the bottom. The last line gives the type of the error and a message, here a ValueError, saying that the text three is not a valid whole number. The lines above show where it happened: the file order dot py, line two, and the code on that line, quantity equals int of text. If the failing call was made from inside other code, there would be more lines, and the one nearest the bottom is the closest to the failure. The exact wording of messages can differ a little between Python versions, but the shape is always the same. The third kind is the hardest, because there is no message at all. If we write price plus quantity instead of price times quantity, Python happily gives seven point five, which is wrong for our order. Only careful tracing, checking results against what you expect, can catch that. A few error names will turn up again and again. A NameError means a name has no object yet, usually because of a typo. A TypeError means an operation was applied to the wrong kind of object. A ValueError means the type was right but the value was not acceptable. And a ZeroDivisionError means exactly what it says. And that is the end of our first chapter. One order can now be represented by a handful of values. Next, we turn to organising many related values and many orders, with strings, lists, tuples, dictionaries, and sets.",
}
