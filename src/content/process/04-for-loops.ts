import type { Section } from '../types'

export const forLoops: Section = {
  id: 'for-loops',
  title: 'for loops: pricing every line of the day',
  scene: 'process-for',
  narration:
    "Pricing one line by hand does not make a pipeline. A for loop runs the same block of code once for each item in a collection, and main dot py now uses one to price every line of the day. The loop's first line says: for each line in ORDERS. On every pass, Python binds the name line to the next dictionary in the list, and runs the indented block below. The diagram on the right freezes the loop on its second pass: the name line now refers to O R D ten oh two, and the running total holds the first line's twenty nine eighty five. Inside the loop, the match statement from the last section decides what to do with each line. A good line gets priced, using the same discount rules as before, now indented one level deeper because they belong to the loop. Its total is added to the day's total with plus equals, which is short for adding to the name and binding it again. Anything else falls through to case underscore, which matches any line at all, and prints that it was skipped. The terminal, and the table below the diagram, show the result. Four lines priced, each with its own discount: twenty nine eighty five, one hundred seventy eight fifty, fifty eight ninety and nine ninety five. The bad line is skipped, with its reason. And after the loop finishes, the day's total: two hundred seventy seven twenty, to the cent. Notice the last line of the file is not indented: it runs once, after the loop. That is the whole of a loop: indentation decides what repeats. The loop works, but the pricing is nested deep inside a case. Next, flatter loops, and two ways to leave one.",
}
