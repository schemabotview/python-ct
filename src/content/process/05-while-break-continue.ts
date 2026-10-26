import type { Section } from '../types'

export const whileBreakContinue: Section = {
  id: 'while-break-continue',
  title: 'while, break and continue',
  scene: 'process-while',
  narration:
    "Deeply nested code is hard to read, and the loop from the last section has the important work buried three levels deep. Two small keywords fix that. The match now only checks the line. If the line is bad, the case adds one to a skipped counter and says continue, which ends this pass immediately and moves on to the next line. A good line falls through to the pricing, which now sits at the loop's own level. The terminal shows the same four totals and the same day total as before, and now a count of one skipped line. The bottom of the file adds something the report will want: the first wholesale order of the day. It uses Python's other loop, while, which repeats for as long as a condition stays true. Here the condition is that the index i is still inside the list. The table at the top of the right hand pane steps through it. At index zero, the first line has three bags, not wholesale, so i goes up by one. At index one, the second line has twelve bags. That is a wholesale order, so the program prints it, and then says break, which leaves the loop entirely, without checking the remaining lines. The middle of the pane puts the two exits side by side: continue skips to the next pass, break leaves the loop. So when should you use which loop? A for loop runs once per item, and is almost always the right choice for walking through a list or a file. A while loop is for when you control the step yourself, and it has a famous trap: if nothing inside it changes its condition, it never ends. Next, loops written in a single line.",
}
