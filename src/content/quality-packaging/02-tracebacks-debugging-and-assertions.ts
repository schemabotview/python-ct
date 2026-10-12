import type { Section } from '../types'

// The pdb post-mortem banner and frame lines are copied from a real run. python -O removing asserts was verified (__debug__ is False under -O). Piped interactive pdb output was messy, so only the commands are tabulated, not a transcript of them.
export const tracebacksDebuggingAndAssertions: Section = {
  id: 'tracebacks-debugging-and-assertions',
  title: "Tracebacks, debugger workflows, assertions, and systematic diagnosis",
  scene: 'diagnosis',
  focus: 'trace',
  slide: `## Diagnosing failures

### A method, not a guess
- **Reproduce** it with the smallest input that fails
- **Read** the traceback from the **last** line up
- **Hypothesise**, then **check** with \`print\`, \`pdb\` or a test
- **Fix**, then add a **regression test**

### The debugger
- \`python -m pdb dbg.py\` stops at an uncaught error: **post-mortem**
- \`p xs\` prints a value; \`n\`, \`s\`, \`c\`, \`w\`, \`l\`, \`q\` move around
- \`breakpoint()\` stops at that line

### Assertions
- \`assert xs, "message"\` is a check for **programmers**
- \`python -O\` removes assertions entirely
- Never use \`assert\` to validate user input`,
  narration:
    "Fixing a failure is a skill, and the best habit is a method rather than guessing. First, reproduce it, with the smallest input you can find that still fails. Second, read the traceback, starting from the last line, which names the error, and then reading upward to the line in your own code where it stopped. Third, form a hypothesis about the cause and check it, with a print statement, a debugger, or a test. And fourth, fix it, and add a regression test so it stays fixed. The card shows a function that averages a list. Calling it with an empty list fails with ZeroDivisionError, division by zero, and the last line of the traceback says so. Python's debugger, pdb, makes checking a hypothesis easy. Running the script with python dash m pdb stops at an uncaught exception in what is called post-mortem mode, showing the file, the line, and the function where it failed, and then you can inspect values. Typing p, then a name, prints that value, so you can see that the list is empty and the total is zero. The table lists the commands: n runs the next line, s steps into a call, c continues, w shows where you are in the call stack, l lists nearby code, and q quits. The breakpoint function placed in your code stops there on purpose. An assertion is a check written for programmers. The assert statement raises an AssertionError with your message if its condition is false, which documents an assumption and catches your own mistakes early. But it has a limit: running Python with the dash capital O flag removes every assertion, so never use assert to validate user input or anything that must hold in production. For that, raise a real exception, as in Chapter 5. Next, recording what a running program does.",
}
