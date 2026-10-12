import type { Section } from '../types'

// A preview only: the loop and the filter mechanics are explained in Chapter 3, and the comprehension is shown here so the learner can read one when it appears. The Chapter 2 bridge into decisions and loops is in the narration.
export const comprehensionsAsAPreview: Section = {
  id: 'comprehensions-as-a-preview',
  title: "Comprehensions as a preview",
  scene: 'comprehension-preview',
  focus: 'comp',
  slide: `## Comprehensions: a first look

A **comprehension** builds a new collection from an existing one in a single expression.

### The pattern
- \`[expression for item in collection]\`
- Add \`if condition\` at the end to keep only some items

### Three kinds of brackets
- \`[...]\` builds a list
- \`{key: value ...}\` builds a dictionary
- \`{value ...}\` builds a set

### Reading one
- "For each \`qty, price\` in \`lines\`, produce \`qty * price\`"
- The loop and the filter are explained fully in Chapter 3

### When to prefer a loop
- Several steps or side effects read better as a loop`,
  narration:
    "We end the chapter with a first look at comprehensions, so that you can recognise one when you see it. Start with the loop on top. We have a list of lines, each a quantity and a price. We make an empty list, then repeat for each line, and append the quantity times the price. The result is thirteen point five, eight, and four point five. A comprehension says the same thing in a single expression. In square brackets, you write the value you want, then for, then the name or names to take from the collection, then in, then the collection. Read it aloud: for each quantity and price in lines, produce quantity times price. If you add if and a condition at the end, only matching items are kept, so adding if qty is greater than one leaves just the first and last totals. The brackets decide what gets built. Square brackets build a list. Curly braces with a key, a colon and a value build a dictionary, as with each name mapped to its length. Curly braces with just a value build a set, so the set of lengths for tea, mug and jar is just three, because duplicates collapse. We have only previewed the idea. Chapter 3 explains how loops and filters actually run, and then comprehensions will make complete sense. And if a transformation has several steps or side effects, a plain loop is usually clearer. We now have data structures. Next, we explain how decisions and iteration transform their contents.",
}
