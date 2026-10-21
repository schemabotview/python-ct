import type { Section } from '../types'

export const firstMainPy: Section = {
  id: 'first-main-py',
  title: "main.py: the first file",
  scene: 'first-main',
  narration:
    "Here is the first file of the pipeline, main dot py, marked new in the explorer. It does very little yet, and that is the point: it gives us something real to run, and a place for the pipeline to grow. The first line starts with a hash sign, which makes it a comment. Python ignores everything after a hash on a line; comments are written for the people reading the code, and this one says in a sentence what the whole program is for. That is a good habit from the very first file. The next two lines call print, a function built into Python. A function is a named piece of behaviour, and you call it by writing its name followed by brackets. Whatever you put inside the brackets is passed to it, and print writes it to the terminal. The first call passes one piece of text, in quotes. The second passes two things separated by a comma, a piece of text and the number zero, and print writes them with a space between. Notice that the number has no quotes: the quotes are what make something text. Now the terminal. With the virtual environment active, python main dot py runs the file, and the two lines appear exactly as the program wrote them. Python ran the file from top to bottom, one line at a time, which, as you saw in the last course, really means it compiled the file to bytecode and then ran that. Zero orders processed is honest for now. Over the next courses that number becomes real: first from orders written into the code, then from the shop's own files. Next, a second way to run Python, for trying things out.",
}
