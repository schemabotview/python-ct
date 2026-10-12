import type { Section } from '../types'

// The nonterminating loop is shown as a real, three-line program rather than described. The final table row is the failed test, because learners most often forget that the test runs one more time than the body.
export const whileLoopsProgressAndTermination: Section = {
  id: 'while-loops-progress-and-termination',
  title: "while loops, progress conditions, and termination",
  scene: 'while-trace',
  focus: 'loop',
  slide: `## while loops and termination

A \`while\` loop repeats **as long as** its condition is true.

### The shape
- The condition is tested **before** every pass, including the first
- If it starts false, the body never runs

### Progress
- Something in the body must move the condition toward false
- A loop that never changes \`n\` never ends

### Boundaries
- \`stock >= 30\` allows a last pass at exactly 30; \`> 30\` does not
- Trace the first pass, a middle pass, and the **last** pass

### for or while?
- \`for\` when you have a collection or a known count
- \`while\` when you repeat until something changes`,
  narration:
    "A while loop repeats a block for as long as its condition stays true. Unlike a for loop, it is not tied to a collection. The condition is tested before every pass, including the first, so if it is false from the start, the body never runs at all. Our example fills orders from a stock of one hundred, thirty units at a time. The table traces it. On the first pass, stock is one hundred, the test is True, and after the body, stock is seventy and one order is filled. The second pass tests seventy, True, and leaves forty. The third tests forty, True, and leaves ten. On the fourth test, ten is not at least thirty, so the test is False and the loop ends. That last row is easy to forget: the test always runs one more time than the body. We print three orders filled and ten units left. A while loop carries a risk that a for loop does not: it can run forever. The last card shows the shape. If the body never changes n, the condition n greater than zero stays true forever, and the program prints five endlessly. The rule is that the body must make progress, meaning something in it must move the condition toward false. If you ever start such a loop by accident, Control-C interrupts it. Boundaries need care too. With greater-than-or-equal thirty, a stock of exactly thirty gets a final pass, and with plain greater-than it does not. When you trace a loop, check the first pass, a middle one, and the last. As a rule of thumb, use for when you have a collection or a known count, and while when you repeat until something changes.",
}
