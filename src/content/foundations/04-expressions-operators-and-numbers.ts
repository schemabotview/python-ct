import type { Section } from '../types'

// Operators, conversion and numeric representation. Floats are introduced as approximations here;
// exact decimal arithmetic for money waits for the files chapter, where the data actually arrives.
export const expressionsOperatorsAndNumbers: Section = {
  id: 'expressions-operators-and-numbers',
  title: 'Expressions, operators, and numbers',
  scene: 'arithmetic-table',
  slide: `## Expressions, operators, and numbers

An **expression** is code that produces a value.

### Division comes in three forms
- \`/\` always gives a **float**: \`7 / 2\` is \`3.5\`
- \`//\` gives the whole-number part, rounded down
- \`%\` gives the remainder

### Order of evaluation
- \`**\` first, then \`*\` \`/\` \`//\` \`%\`, then \`+\` \`-\`
- Parentheses override the order

### Numbers are not all alike
- An \`int\` is exact at any size
- A \`float\` stores the nearest binary value, so \`0.1 + 0.2\` is not \`0.3\`
- \`int(3.9)\` gives \`3\`: it cuts off, it does not round`,
  narration:
    "An expression is any piece of code that produces a value, and the table shows seven of them with exactly what Python produces. Start with division, which comes in three forms. The single slash always gives a float, so seven divided by two is three point five, and even ten divided by two is five point zero, with a decimal point. The double slash divides and rounds down to a whole number, so seven double-slash two is three. The percent sign gives the remainder, so seven percent two is one. Double asterisk is the power, so two to the tenth is one thousand and twenty-four. When an expression has several operators, Python applies power first, then multiplication and division together, then addition and subtraction, and you can use parentheses to force a different order. Now the surprising row at the bottom. Zero point one plus zero point two does not give zero point three. It gives zero point three followed by a long tail of zeros and a four. A float stores the nearest value it can represent in binary, and many decimal fractions simply have no exact binary form. This is not a bug in Python. On CPython, a float is a sixty-four bit binary floating-point number, and any language using that representation behaves the same way. Whole numbers are different. An int is exact at any size. Finally, converting between types is something you ask for. Calling int on three point nine gives three, because it cuts off the decimal part rather than rounding. When money is involved, we will need something safer than float, and we will meet it later in the course.",
}
