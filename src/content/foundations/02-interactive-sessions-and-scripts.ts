import type { Section } from '../types'

// The first execution walkthrough. The third line of the script is the whole point: the same
// expression is echoed in a session and discarded in a file.
export const interactiveSessionsAndScripts: Section = {
  id: 'interactive-sessions-and-scripts',
  title: "Interactive sessions versus scripts: a first execution walkthrough",
  scene: 'repl-vs-script',
  focus: 'script',
  slide: `## Interactive sessions versus scripts

Python can run your code in two ways.

### Interactive session
- You type one statement after the \`>>>\` prompt
- Python runs it and **shows the value** of an expression at once
- Best for trying an idea or checking a result

### Script
- Statements saved in a \`.py\` file, run top to bottom
- Started with \`python order.py\`
- Shows **nothing** unless you call \`print()\`
- Best for a program you keep and run again

### Tracing the script
1. Line 1 binds \`price\` to \`4\`
2. Line 2 binds \`quantity\` to \`3\`
3. Line 3 computes \`12\` and **discards** it
4. Line 4 prints \`12\``,
  narration:
    "Python can run your code in two ways, and the difference trips up almost every beginner. The first is an interactive session. You see a prompt made of three greater-than signs, you type one statement, and Python runs it immediately. If the statement is an expression, meaning something that produces a value, Python shows you that value straight away. That makes a session ideal for trying an idea or checking a result. The second way is a script. You save your statements in a file, here called order dot py, and ask Python to run the whole file from the top to the bottom. A script is the right choice for a program you want to keep and run again. Let us trace the script on screen, one line at a time. Line one gives the name price the value four. Line two gives the name quantity the value three. Line three multiplies them and gets twelve, and then nothing happens to that twelve. A script does not echo values the way a session does, so the result is calculated and then simply thrown away. Only line four, which calls print, puts anything on the screen. You can see that in the terminal card: the whole run shows a single twelve. So the same expression, price times quantity, displays twelve in a session but displays nothing in a script. If a script is supposed to show an answer, it has to say so, with print. The commands you see are illustrations, and you are welcome to try them, but you do not need to in order to follow along.",
}
