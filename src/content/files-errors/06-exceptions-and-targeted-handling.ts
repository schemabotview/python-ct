import type { Section } from '../types'

// The four blocks are shown in one function so the order of output is visible. Catching narrowly is taught with the exception hierarchy because a parent handler catching its children is what makes broad handlers dangerous.
export const exceptionsAndTargetedHandling: Section = {
  id: 'exceptions-and-targeted-handling',
  title: "Exceptions, try/except/else/finally, and targeted handling",
  scene: 'exception-flow',
  focus: 'func',
  slide: `## Exceptions and targeted handling

An **exception** is an error object that interrupts normal flow.

### The four blocks
- \`try\`: the code that might fail
- \`except\`: runs only if a matching exception was raised
- \`else\`: runs only if **nothing** was raised
- \`finally\`: runs **always**, even after a \`return\`

### Catch narrowly
- Name the exception you expect: \`except ValueError\`
- Several at once: \`except (ValueError, TypeError)\`
- \`except Exception\` and a bare \`except\` hide real bugs

### Hierarchy
- \`FileNotFoundError\` is an \`OSError\`; \`KeyError\` is a \`LookupError\`
- A handler for a parent type also catches its children`,
  narration:
    "So far, an error has meant a traceback and a stopped program. An exception is an object that Python creates when something goes wrong, and it interrupts the normal flow until something handles it. You handle one with try and except. The code you suspect goes in the try block. If it raises an exception matching the except clause, Python skips the rest of the try block and runs the handler instead. Two more blocks complete the picture. Else runs only if nothing was raised, and finally runs always, even if a block ended with return. The function in the card has all four, and the table traces them. With the text three, the try completes, except is skipped, else runs and prints parsed, and finally prints done, then the function returns three. With the text x, the try stops at the int call, except runs and prints not a number, else is skipped, and finally still prints done. Notice that finally ran in both cases, which makes it the right place for cleanup. The most important habit is to catch narrowly. Name the exception you actually expect, such as ValueError, and use a tuple of names to handle more than one. A handler for the broad Exception class, or a bare except, will also swallow bugs you did not anticipate, such as a typo causing a NameError, and the program will carry on in a wrong state. Exceptions form a hierarchy. FileNotFoundError is a kind of OSError, and KeyError is a kind of LookupError, so a handler for the parent catches the child. Next, raising exceptions of our own.",
}
