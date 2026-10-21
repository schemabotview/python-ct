import type { Section } from '../types'

export const readingATraceback: Section = {
  id: 'reading-a-traceback',
  title: 'Reading a traceback',
  scene: 'reading-traceback',
  narration:
    "Every Python programmer spends a lot of time reading tracebacks, and most beginners read them in the wrong order. A traceback is the call stack from earlier in this course, printed at the moment something went wrong. In this file, the order contains a product code, K E N two fifty, that is not in the price table, and the terminal shows what happens. The rule is: read it from the bottom up. The last line is what went wrong. KeyError, KEN two fifty: Python looked up that key in a dictionary and it was not there. Very often that line alone tells you the fix. The line above it is where it happened: line five, in line total, the newest frame, which was running when the error was raised, with the exact expression underlined. Above that is who called it: line eleven, in order total. And at the top is where the whole run started: line fifteen, in the module. The highlighted lines in the editor are those same three places, and the table below lays out the reading order. Reading from the top first sends you to the line where the program started, which is almost never where the problem is. Two more things to notice. The little carets and tildes under each line point at the exact part of the expression that failed, which matters when one line does several things. And nothing after the error ran: the total was never printed. Later in the course the pipeline will catch exactly this kind of error, so that one bad product code is reported instead of stopping a whole day's run. That completes the picture of how Python runs your code. In the next course, we start the project.",
}
