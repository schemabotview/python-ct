import type { Section } from '../types'

// Recursion limit of about 1000 is stated as a CPython default, not a language guarantee. The iterative stack version is described rather than shown, to keep the scene within the frame.
export const recursionBaseCasesAndIteration: Section = {
  id: 'recursion-base-cases-and-iteration',
  title: "Recursion, base cases, and iterative alternatives",
  scene: 'recursion-tree',
  focus: 'func',
  slide: `## Recursion and base cases

A **recursive** function calls itself on a smaller part of the problem.

### Two parts
- **Base case**: answers directly, with no further call, such as a category with no children
- **Recursive case**: combines the answers for each child

### Reading a call
- \`category_total(Coffee)\` calls \`category_total(Espresso)\` first
- Every call has its **own** \`total\`

### Limits
- With no base case: a \`RecursionError\`
- CPython allows about 1000 nested calls by default

### A loop instead?
- A loop with an explicit **stack** does the same job
- Recursion fits best when the data is itself nested`,
  narration:
    "Our product categories are nested: a category can have child categories, which can have children of their own. To total a whole category, we add its own total to the totals of all of its children, and each child does the same for its children. A function that calls itself like this is recursive. Every recursive function needs two parts. The base case is the situation where the function can answer directly without calling itself. For a category with no children, the loop body never runs, so the function returns its own total. The recursive case handles everything else by calling the function on each child, a smaller version of the same problem. The tree in the diagram is also the call trace. Calling category total on drinks first calls it on tea, which is a leaf and returns thirteen point five. Then on coffee, which calls it on espresso, a leaf that returns two point five, so coffee returns ten point five. Finally drinks adds zero, thirteen point five, and ten point five to return twenty-four. Each call has its own local total, so the calls do not interfere with each other. A recursive function with no base case calls itself forever, and Python stops it with a RecursionError. In CPython, the default limit is about one thousand nested calls, an implementation setting rather than a language rule. Anything recursive can also be written as a loop with an explicit stack of items still to visit. Recursion is usually clearer when the data is itself nested, and a loop is better when the depth could be very large. Next, we put functions together into a whole program.",
}
