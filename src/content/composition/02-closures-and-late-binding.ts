import type { Section } from '../types'

// Late binding is the section's main failure and is shown with its actual output ([2, 2, 2]). Both repairs were verified. Chapter 4's enclosing scope is revisited here, as that chapter promised.
export const closuresAndLateBinding: Section = {
  id: 'closures-and-late-binding',
  title: "Closures, captured state, nonlocal, and late binding",
  scene: 'closure-late-binding',
  focus: 'closures',
  slide: `## Closures and late binding

A **closure** is a function that remembers names from the scope where it was created.

### Capturing
- \`make_tax(0.5)\` returns \`with_tax\`, which keeps \`rate\`
- Each call to \`make_tax\` makes a **separate** closure

### Changing captured state
- Assigning to a captured name needs \`nonlocal\`
- Without it: \`UnboundLocalError\`, as in Chapter 4
- Mutating a captured list needs no \`nonlocal\`

### Late binding
- A closure keeps the **name**, not its value at that moment
- \`lambda: i\` in a loop: every function sees the **final** \`i\`
- Repairs: a default \`i=i\`, or \`partial\`, or a factory function`,
  narration:
    "In Chapter 4, you met the enclosing scope: the names of an outer function. Now we use it. When a function is defined inside another and uses one of the outer function's names, Python keeps that name alive for as long as the inner function exists. That inner function is a closure. In the card, make tax of zero point five returns the inner function with tax, and with tax remembers the rate. Calling make tax again with zero point two returns a separate closure that has its own rate, which is why the two calls give fifteen and twelve. A closure can also carry changing state. Make counter keeps a count, and each hit increments it. But assigning to a captured name creates a new local one unless you declare it with nonlocal, which is why the version without nonlocal fails with an UnboundLocalError, as it did in Chapter 4. Each counter has its own count, so a second counter starts again at one. Mutating a captured list needs no nonlocal, because we change the object rather than assign the name. Now the most famous closure trap, in the second card. We build three lambdas in a loop, each returning i. Calling them gives two, two, two, not zero, one, two. A closure keeps the name i, not its value at the moment the lambda was created, so all three look up the same variable, which by the time we call them holds its final value, two. This is called late binding. There are three standard repairs. Give the lambda a default argument, i equals i, which captures the current value at creation time. Or use functools dot partial to fix the argument. Or write a small factory function that takes i as a parameter, so each lambda gets its own. Next, functions that wrap other functions.",
}
