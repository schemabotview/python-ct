import type { Section } from '../types'

// Loop else is taught only as 'no break happened' because that is the single reading that stays correct; the mistakes table collects failures that earlier sections warned about.
export const breakContinueLoopElseAndMistakes: Section = {
  id: 'break-continue-loop-else-and-mistakes',
  title: "break, continue, loop else, and common loop mistakes",
  scene: 'loop-control',
  focus: 'control',
  slide: `## break, continue, and loop else

### Leaving and skipping
- \`break\` ends the loop at once
- \`continue\` skips straight to the next pass

### Loop else
- \`else\` after a loop runs only if the loop did **not** hit \`break\`
- Read it as "no match was found"

### Common mistakes
- Changing a list while looping over it skips items
- Removing the evens from \`[2, 4, 6]\` in a loop leaves \`[4]\`
- A \`while\` with no progress never ends
- \`range(len(x))\` hides the simpler \`for item in x\`

### The safer pattern
- Build a **new** list: \`[v for v in x if v % 2 != 0]\``,
  narration:
    "Two statements change how a loop runs. Break ends the loop immediately, and continue skips the rest of the current pass and moves on to the next one. The first example searches a list of codes. When code equals B dash two, we print found and break, and the loop stops, so C dash three is never examined. Notice the else block attached to the for loop. Else after a loop runs only if the loop finished without hitting break. Here we found the code, so the else is skipped. If we had searched for a code that is not in the list, the loop would run to the end, and the else would print not found. Read it as: if we never found it. The second example uses continue. For the quantities three, zero, and two, we want one hundred divided by each quantity. When the quantity is zero, continue skips the division, so there is no ZeroDivisionError, and we get thirty-three point three, repeating, and then fifty. Now the table of common mistakes. The subtlest is changing a list while looping over it. If you remove the even numbers from the list two, four, six inside a for loop, the loop skips items as the list shrinks beneath it, and the result is a list with four still in it. The safe pattern is to build a new list with a comprehension. The other mistakes you have already met: a while loop with no progress never ends, looping over range of len of x when you could loop over x directly makes the code clumsy, and a single equals in a condition is a SyntaxError.",
}
