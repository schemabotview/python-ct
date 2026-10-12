import type { Section } from '../types'

// Completes the Chapter 2 comprehension preview: the same filter is shown as a loop and as a comprehension so the mapping is visible. The bridge into Chapter 4 is in the narration.
export const loopsComprehensionsAndSmallAlgorithms: Section = {
  id: 'loops-comprehensions-and-small-algorithms',
  title: "From traced loops to comprehensions and small algorithms",
  scene: 'loop-algorithms',
  focus: 'filter',
  slide: `## From loops to comprehensions and algorithms

### Accumulate into a dictionary
- \`totals.get(item, 0) + ...\` starts a missing key at zero
- One pass over \`sales\` totals every item

### Track the best so far
- Start with the first item
- Replace it whenever a better one appears

### Loop, then comprehension
- A loop that filters builds an empty list, tests, then appends
- The comprehension says the same in **one expression**

### Choosing
- Comprehension: one transformation, or one filter
- Loop: several steps, or a value carried across passes
- \`sum\`, \`min\` and \`max\` already do common accumulations`,
  narration:
    "This section turns the loops you can now trace into small algorithms. The first is aggregation. We have three sales lines, and we want a total per item. We start with an empty dictionary. For each line, we unpack the item, quantity, and price, then add the line total to whatever the dictionary already holds for that item. The call to get with a default of zero is the trick: a missing item starts at zero, so the first tea adds to nothing. After one pass, tea totals twenty-two point five and mug totals eight. The second algorithm finds the best line so far. We start by assuming the first line is best, then loop through all the lines, and replace best whenever a line has a higher total. After the loop, best holds the line with the biggest total, three teas at four point five. The third card shows a filter written both ways. The loop starts with an empty list, tests each line, and appends the item when the quantity is more than one. The comprehension below expresses the same thing in one expression, and now you can see how it maps: the loop's append value goes at the front, the for clause is the loop header, and the if clause is the test. So when should you use which? A comprehension suits one transformation or one filter. A loop is better when there are several steps, or a value carried from pass to pass, like the running totals. And remember that sum, min, and max already do common accumulations. Repeated logic is now visible. Next, we give it names, inputs, outputs, and clear responsibilities.",
}
