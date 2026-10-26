import type { Section } from '../types'

export const theRepl: Section = {
  id: 'the-repl',
  title: 'The REPL beside the editor',
  scene: 'start-repl',
  narration:
    "Python has a second way to run code, and it is the one you will reach for whenever you are not sure what a line will do. Typing python on its own, here with dash q to skip the banner, opens the REPL. The name describes the loop on the right: it reads the line you type, evaluates it, prints the value, and waits for the next one. Unlike a script, it shows you the value of everything, without being asked. We want main dot py to print what three bags of coffee cost, so we try it here first. nine point nine five comes straight back. Three bags, nine point nine five times three, comes back as twenty nine point eight four nine nine nine, and a long tail of nines. That is not a typing mistake, and it is not a bug in Python. A float stores numbers in binary, and nine point nine five has no exact binary form, so what you get is the nearest value a float can hold. The REPL is also good for small questions about text: the first three characters of the product code come back as E T H. Then exit leaves the REPL, and everything typed there is gone; the table at the bottom puts the REPL and the file side by side. Trying the line has done its job, so we write it into main dot py as line five and run the file. The new line prints the same long number. For a coffee shop, that is the wrong answer: money must come out in exact cents. We will leave it here for now, deliberately, and fix it properly in the next course, with a type made for money.",
}
