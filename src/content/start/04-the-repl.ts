import type { Section } from '../types'

export const theRepl: Section = {
  id: 'the-repl',
  title: "The REPL beside the editor",
  scene: 'repl-beside',
  narration:
    "Running a file is how you build a program. But when you just want to try one line, writing a file and running it is slow, and Python has something better: the REPL. The name stands for read, evaluate, print, loop, which is exactly what it does. Type python on its own, with no file name, and the terminal shows the version and a prompt of three angle brackets. Python is now waiting for you. It reads the line you type, evaluates it, prints the result, and loops back for the next one. In the terminal, we set a price, and then ask for the price times two, and the REPL prints nineteen point zero without being asked. That is the big difference from a script: in the REPL, any expression you type has its value shown automatically. In a file, nothing is shown unless you call print. Notice too that nine point five zero came back as nineteen point zero: a number like this has no memory of how many digits you typed, which is a first hint of why money needs special care, coming in the next course. The table on the right sums it up. The REPL is for trying one line: checking how something behaves, testing a guess, exploring an object. A script is for building the program, because it is saved, and the REPL forgets everything the moment you type exit. Professional developers keep both open, side by side, exactly like this: the editor for the code they are keeping, the REPL for questions. Whenever this course says try it, the REPL is the fastest way to do so. Next, what happens when the first run goes wrong.",
}
