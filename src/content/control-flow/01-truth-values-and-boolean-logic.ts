import type { Section } from '../types'

// Opens the chapter by defining a condition. Truthiness and short-circuiting are taught together because the idiom `x and ...` guarding a division relies on both.
export const truthValuesAndBooleanLogic: Section = {
  id: 'truth-values-and-boolean-logic',
  title: "Truth values, comparisons, Boolean operators, and short-circuit evaluation",
  scene: 'truth-and-logic',
  focus: 'logic',
  slide: `## Truth values and Boolean logic

A **condition** is an expression that Python treats as true or false.

### Comparisons
- \`==\` \`!=\` \`<\` \`<=\` \`>\` \`>=\` give \`True\` or \`False\`
- They chain: \`0 < qty <= 5\`
- \`==\` compares and \`=\` assigns, so never swap them

### Truthiness
- Zero, \`""\`, \`[]\`, \`{}\` and \`None\` count as **false**
- Everything else counts as **true**, even \`"0"\` and \`"False"\`

### and, or, not
- \`and\` and \`or\` return one of their **operands**, not only a bool
- They **short-circuit**: the right side runs only if it is needed
- So \`qty != 0 and 100 / qty > 20\` never divides by zero`,
  narration:
    "Every decision a program makes rests on a condition, which is an expression that Python can treat as true or false. The simplest conditions are comparisons. Double equals asks whether two values are equal, exclamation equals asks whether they differ, and the four angle-bracket operators compare size. Each gives back True or False. They can also be chained, so zero less than qty less than or equal to five checks both ends at once. Be careful with one thing: a single equals sign assigns a name, and a double equals compares, and swapping them is a classic mistake. Python does not insist on a True or False. Any value can be used as a condition, and it counts as true or false by a simple rule. Zero, an empty string, an empty list, an empty dictionary, and None all count as false. Everything else counts as true, which includes the text zero and the text False, because non-empty text is non-empty text. The table shows seven examples. Next, the Boolean operators. And, or, and not combine conditions. There is a subtle detail: and and or do not always return True or False. They return one of the operands. Coupon or the text no coupon gives the text, because coupon is None, which is false. And qty and price gives four point five, the last operand it looked at. Finally, they short-circuit, meaning the right-hand side is evaluated only if the left side has not already decided the answer. That is why the last line is safe. When qty is zero, the left side is False, so Python never evaluates the division, and there is no ZeroDivisionError. Next, using conditions to choose between blocks of code.",
}
