import type { Section } from '../types'

export const mainPy: Section = {
  id: 'main-py',
  title: 'main.py: the first lines, run from the terminal',
  scene: 'start-main',
  narration:
    "The pipeline begins as a single file, main dot py. It is nothing more than text, four lines of it, and the explorer marks it as new. The first line starts with a hash sign, which makes it a comment: a note for people, which Python skips entirely. The second line is blank. The two lines after that are the first real code in the project, and both of them call print. In the terminal, python main dot py hands the file to the interpreter from our environment. Python reads it from the top to the bottom and runs each line in order, which is why the table on the right walks down the file one line at a time. The comment and the blank line do nothing. Line three prints the pipeline's banner. Line four prints a price. Look at how that line is built, because the second table on the right takes it apart. print was given three separate things, separated by commas: some text, a number, and some more text. Text in quotes is called a string, and a number with a decimal point is called a float. print turns each of them into characters, puts a single space between them, and ends the line, so three arguments become one line in the terminal. Notice that the quotes never appear in the output: they only tell Python where the text starts and ends. This is the shape every program in the course will have. A file of instructions, an interpreter that runs them in order, and output you can read. Next, before we write the next line, we will try it out first, in the REPL.",
}
