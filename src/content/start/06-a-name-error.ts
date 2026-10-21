import type { Section } from '../types'

export const aNameError: Section = {
  id: 'a-name-error',
  title: "A NameError: found while it runs",
  scene: 'name-error',
  narration:
    "Now every bracket is fine, but on line four, highlighted, print is spelt p r n t. This is valid Python, as far as the parser is concerned: p r n t is a perfectly good name. So this time the file compiles, and the program starts running. Look at the terminal. The first line of output appears: roastery etl, starting. Line three ran, and printed, exactly as it should. Then line four runs. Python looks up the name p r n t, in the namespaces you met in the last course, finds nothing, and raises a NameError. The traceback names the file and the line, underlines the name it could not find, and, on the last line, makes a suggestion: did you mean print? Python 3 has become very good at these hints, and they are right far more often than not. The table on the right is the real lesson of this pair of errors. A SyntaxError is found by the parser, before any line runs, so nothing happens at all. A NameError is found by the running program, when it reaches the bad line, so everything before that line has already happened. Here that only means one message was printed. But think ahead to the pipeline. When it is processing a whole day of orders, a mistake that only shows up halfway through the run is far more dangerous than one that stops it at the start, because by then it may already have written half a report. That is why we will test the pipeline in course ten, and why it will check its input before it starts writing. For now, the habit is the same for both: read the last line first, then the line it points at. That completes the setup. In the next course, we start holding real data.",
}
