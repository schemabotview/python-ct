import type { Section } from '../types'

export const decisions: Section = {
  id: 'decisions',
  title: 'Decisions: the discount rules',
  scene: 'process-decisions',
  narration:
    "The shop has two discount rules, and they are the pipeline's first real decision. Ten or more bags of one coffee is a wholesale line, and gets fifteen percent off. Otherwise, a line worth fifty or more gets five percent. Anything else pays full price. In Python, decisions are written with if, elif, which is short for else if, and else. Each condition is checked in order, the first one that is true has its block run, and the rest are skipped. Look at the indentation in the editor: the lines that belong to a branch are indented under it, and that indentation is not decoration. Python uses it to decide which lines are inside which block. The chart on the right draws the same rules. For our line of twelve bags, the first question is already true, so the rate is fifteen percent, and the second question is never even asked. That path is lit. The order of the branches is part of the rule. If the fifty check came first, twelve bags of Colombian, worth two hundred and ten, would get only five percent. The table below the chart applies the rules to every line of the first day. Three bags worth twenty nine eighty five get nothing, two bags of Kenyan worth sixty two get five percent, and so on. Python also has a one line form for choosing between two values, the conditional expression. In the REPL, the word wholesale if quantity is ten or more, else retail, gives wholesale. Use it for short choices like this one; anything longer reads better as a full if statement. Next, a decision based not on a value, but on a shape.",
}
