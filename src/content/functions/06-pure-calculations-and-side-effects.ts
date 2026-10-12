import type { Section } from '../types'

// Presented as a design property, not a rule: the question is where effects belong, and the answer for the reporting program is at its edges.
export const pureCalculationsAndSideEffects: Section = {
  id: 'pure-calculations-and-side-effects',
  title: "Pure calculations, side effects, and explicit dependencies",
  scene: 'purity',
  focus: 'funcs',
  slide: `## Pure calculations and side effects

A **pure** function's result depends only on its arguments, and it changes nothing else.

### Side effects
- Printing, writing files, changing a caller's list or a global

### Hidden dependencies
- \`with_global_rate(price)\` reads a global, so the same call can change meaning
- \`with_tax(price, rate)\` states its input explicitly

### Return or mutate?
- \`sorted(prices)\` returns a new list; \`prices.sort()\` changes the caller's
- A surprising mutation is a bug waiting to happen

### Where effects belong
- Keep calculations pure; put printing and files at the edges`,
  narration:
    "A pure function has two properties. Its result depends only on its arguments, and it changes nothing outside itself. Anything else it does is called a side effect: printing to the screen, writing to a file, changing a list that the caller passed in, or changing a global variable. The table classifies four functions. With tax of price and rate is pure. Give it the same two arguments and you always get the same answer, and it changes nothing. With global rate looks harmless, and it does not change anything, but its answer depends on a hidden input, the global rate. The same call, with global rate of ten, could give twelve today and fifteen tomorrow, because someone changed the global. Passing rate as an explicit parameter makes the dependency visible at every call. Next, sort prices. It receives a list, sorts it in place, and returns None. Its side effect is that it changes the caller's list, and a caller who did not expect that gets a surprise. Compare it with the sorted built-in, which returns a new list and leaves the original alone. And the last row, printing a total, depends on its argument but writes to the screen, which is a side effect. Side effects are not bad, because a program that never prints or saves anything is useless. The point is to know where they are. A good habit is to keep calculations pure and push printing and file access to the edges of the program. Pure functions are easy to test, easy to reuse, and easy to reason about.",
}
