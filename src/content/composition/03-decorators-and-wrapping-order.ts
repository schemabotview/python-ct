import type { Section } from '../types'

// Decorators have been used and deferred since Chapter 7; this section cashes the promise. The wrapping-order example is deliberately not shout/exclaim, which gives the same answer in both orders and so shows nothing; the tag example differs visibly.
export const decoratorsAndWrappingOrder: Section = {
  id: 'decorators-and-wrapping-order',
  title: "Decorators, wrapping order, and parameterised decorators",
  scene: 'decorator-expansion',
  focus: 'basic',
  slide: `## Decorators and wrapping order

A **decorator** is a function that takes a function and returns a replacement.

### What @ does
- \`@log_calls\` above a \`def\` means \`line_total = log_calls(line_total)\`
- The wrapper passes \`*args, **kwargs\` on

### Stacking
- The decorator **nearest the \`def\`** is applied first
- Order changes the result: \`<b><i>\` or \`<i><b>\`

### Parameterised decorators
- \`@tag("b")\` calls a **factory** that returns the decorator
- \`@repeat\` without parentheses: \`TypeError\`

### The cost
- A wrapper **replaces** the function: its name becomes \`wrapper\`
- The next section fixes it
`,
  narration:
    "We have used decorators since Chapter 7, with at-property, at-classmethod, and at-dataclass, and each time we said we would explain them later. Now we can. A decorator is just a function that takes a function and returns a replacement. The at sign is shorthand. Writing at log calls above a def means exactly: define line total, then assign line total equals log calls of line total. The decorator in the first card defines a wrapper function that accepts any arguments, prints, calls the original with the same arguments, prints the result, and returns it. After decoration, calling line total runs the wrapper, which is why it prints calling line total and returned thirteen point five. At property and at dataclass work the same way. Decorators can be stacked, and then the order matters. The one nearest the def is applied first, so it is the innermost layer. The second card uses a tag decorator. With b on top and i underneath, the result is b wrapped around i wrapped around hi. Swap them, and the tags nest the other way round. A parameterised decorator takes arguments, as in at tag of b. Here, tag is not the decorator but a factory that returns the decorator, so you need three nested layers: the factory takes the argument, the decorator takes the function, and the wrapper takes the call's arguments. And a very common mistake is to use a factory without parentheses, writing at repeat. Python then passes the function to the factory instead, and the first call to the result fails with a TypeError about a missing argument. One cost to know about: a wrapper replaces the original function, so its name and docstring are lost. The next section shows the fix. Next, the standard tools for functions.",
}
