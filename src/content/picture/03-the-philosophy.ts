import type { Section } from '../types'

export const thePhilosophy: Section = {
  id: 'the-philosophy',
  title: 'The philosophy: readability, and batteries included',
  scene: 'picture-zen',
  narration:
    "Python has a philosophy, and it is short enough to print. Type import this, and Python prints the Zen of Python, nineteen lines by Tim Peters. The terminal shows the first seven. Beautiful is better than ugly. Explicit is better than implicit. Simple is better than complex. And the one that matters most for us: readability counts. The editor shows why, with one rule written twice: ten percent off an order of three bags or more. The first version fits on one line. It is correct, and the terminal shows that both versions print twenty seven. But to understand it, a reader has to decode b, p, a bare point nine, and a condition hidden inside a multiplication, all at once. The second version says the same thing in five short lines. The names say what the values are, a docstring states the rule in plain words, and the discount is an if, which is exactly how you would describe it out loud. Code is read far more often than it is written, by colleagues, by reviewers, and by you, six months later. Python's style is built around that reader, and so is this course. The other half of the philosophy is the table on the right. Batteries included means the standard library covers most everyday jobs, and our pipeline will need nothing else. Exact money comes from decimal. The shop's daily files are read with csv, and the catalogue with json. pathlib finds the files, sqlite three stores the results, datetime handles the dates, and logging records what happened. All of it ships with Python. Next, what Python is fast at, and what it is not.",
}
