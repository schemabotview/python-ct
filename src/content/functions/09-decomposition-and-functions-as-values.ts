import type { Section } from '../types'

// Closes the chapter and carries the bridge into files. The named sort key finishes the Chapter 2 preview of key=; lambda is still deliberately not used (Chapter 9).
export const decompositionAndFunctionsAsValues: Section = {
  id: 'decomposition-and-functions-as-values',
  title: "Decomposing a program; functions as values in simple callbacks",
  scene: 'decomposition',
  focus: 'callbacks',
  slide: `## Decomposing a program; functions as values

### Decomposing
- One function, one job: parse, price, total, format
- Each can be tested and reused on its own

### Functions are values
- \`line_total\` without parentheses is the function **object**
- \`sorted(sales, key=line_total)\` passes it as a **callback**
- \`line_total(x)\` with parentheses **calls** it

### A callback in your own code
- \`apply_all(values, fn)\` calls whatever \`fn\` it is given
- The caller picks the behaviour: \`tax\`, \`str.strip\`

### Naming
- Name a function for what it **returns** or does: \`order_total\``,
  narration:
    "Now we can organise a program. Decomposing means splitting it into small functions, each with one job. Our reporting program becomes four functions. Parse line turns a line of text into a tuple. Line total calculates the cost of one line. Order total adds up all the lines. And format report turns the total into text for the screen. Each function is small enough to understand, test, and reuse by itself, and only the last one has a side effect of showing something to a person. Here is something new that makes this even more powerful. In Python, a function is a value, an object like any other, so you can pass it to another function. Look at the sorted call in the code card. Line total, written without parentheses, is the function object itself. Adding parentheses would call it. Passing it as the key tells sorted to call line total on each sale and order the sales by the result. A function passed in to be called later is a callback. This finishes the key function preview from Chapter 2: now you can write your own. You can write your own functions that accept callbacks, too. Apply all takes a list of values and a function, and returns the result of calling that function on each value. The caller chooses the behaviour: pass tax and you get fifteen and thirty, pass str dot strip and you remove spaces. A good name says what a function returns or does, such as order total. Functions organise computation. Next, we connect that computation to files and handle failures at its boundaries.",
}
