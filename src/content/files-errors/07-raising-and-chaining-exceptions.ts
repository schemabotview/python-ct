import type { Section } from '../types'

// A one-line custom exception class is shown as a pattern and explicitly deferred to Chapter 7 for explanation. The traceback is shown with frames omitted because the chain sentence is the lesson.
export const raisingAndChainingExceptions: Section = {
  id: 'raising-and-chaining-exceptions',
  title: "Raising and chaining exceptions; domain-specific error meaning",
  scene: 'chaining',
  focus: 'raise',
  slide: `## Raising and chaining exceptions

### Raising
- \`raise OrderError("message")\` stops the function and unwinds the calls
- A bare \`raise\` inside \`except\` re-raises the **same** exception

### Chaining
- \`raise NewError(...) from err\` records \`err\` as the **cause**
- The traceback shows both, joined by "the direct cause of"
- Without \`from\`, Python links the first as the **context**
- \`from None\` hides the original

### Domain errors
- A type named for the problem: \`class OrderError(ValueError)\`
- Callers catch \`OrderError\` rather than matching message text
- Classes are explained fully in Chapter 7`,
  narration:
    "You can raise an exception yourself with the raise statement. It stops the current function and unwinds through its callers, looking for a handler, exactly like the exceptions Python raises. Inside an except block, a bare raise re-raises the same exception, which is useful when you want to log something and then let the error continue. Often a low-level error is not meaningful to the caller. In our import, a ValueError from int says invalid literal for int, but it does not say which order was bad. So we catch it and raise a domain error, an error type named for the problem in our program. The class at the top of the card is a one-line pattern: it defines OrderError as a kind of ValueError, and we will explain classes properly in Chapter 7. The function catches the ValueError and raises an OrderError with a clear message naming the quantity and the order id. The key is the words from err. That records the original error as the cause, so Python prints both in the traceback, joined by the sentence: the above exception was the direct cause of the following exception. You see the low-level error and the meaningful one. If you raise a new exception inside an except block without from, Python still links the first one, as the context. And from None hides the original, which you should rarely want. A named error type has another advantage: callers can catch OrderError itself, instead of matching message text. Next, deciding what to do when a record is bad.",
}
