import type { Section } from '../types'

// Introduces the block and indentation here, since this is the first compound statement. Order of elif tests is shown as a real bug rather than a style point.
export const ifElifElseAndNestedDecisions: Section = {
  id: 'if-elif-else-and-nested-decisions',
  title: "if/elif/else and nested decisions",
  scene: 'decision-branches',
  focus: 'shipping',
  slide: `## Decisions with if, elif, and else

A decision runs a **block** of code only when its condition is true.

### The shape
- \`if\`, then any number of \`elif\`, then an optional \`else\`
- The **indented** block under each header belongs to it
- Only the **first** true branch runs; Python skips the rest

### Order matters
- Test the narrowest case first: \`>= 50\` before \`>= 20\`
- Reversed, 60 would match \`>= 20\` and pay \`2.5\`

### Nested decisions
- An \`if\` inside a branch refines that branch

### Common mistakes
- A missing indent raises an \`IndentationError\`
- \`if qty = 3:\` is a \`SyntaxError\`: use \`==\``,
  narration:
    "A decision lets a program choose which code to run. The statement is if, followed by a condition and a colon. The lines indented beneath it form a block, and the block runs only if the condition is true. Indentation is how Python knows which lines belong together, so it is part of the syntax, not decoration. In our shipping example, we add elif, short for else if, to test a second condition, and else, to catch everything that matched nothing. Python tests the conditions from the top and runs only the first branch whose condition is true, then skips the rest. The table traces five totals. Sixty and fifty both run the first branch, because greater-than-or-equal includes the boundary value, fifty. Twenty-five and twenty run the elif. And thirteen point five matches neither test, so the else runs and the shipping is five. That is the final line of the code card. Order matters, and this is a real bug, not a matter of style. If we had written the greater-than-or-equal-twenty test first, a total of sixty would match it immediately and be charged two point five, and the fifty test would never be reached. Always test the narrowest case first. Decisions can also be nested, with an if inside a branch of another if, which refines that branch. When there is no separate else for the inner question, joining the two conditions with and is often clearer. Two mistakes to recognise: a missing indent raises an IndentationError, and writing a single equals sign in a condition is a SyntaxError, and Python even suggests double equals.",
}
