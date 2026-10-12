import type { Section } from '../types'

// Operators, conversion and numeric representation. Floats are introduced as approximations here;
// exact decimal arithmetic for money waits for the files chapter, where the data actually arrives.
export const expressionsOperatorsAndNumbers: Section = {
  id: 'expressions-operators-and-numbers',
  title: "Expressions, operators, conversion, and numeric representation",
  scene: 'arithmetic-table',
  slide: `## Expressions, operators, and numbers

An **expression** is code that produces a value.

### Division comes in three forms
- \`/\` always gives a **float**: \`7 / 2\` is \`3.5\`
- \`//\` gives the whole-number part, rounded **down**: \`-7 // 2\` is \`-4\`
- \`%\` gives the remainder

### Order of evaluation
- \`**\` first, then \`*\` \`/\` \`//\` \`%\`, then \`+\` \`-\`
- Parentheses override the order

### Numbers are not all alike
- An \`int\` is exact at any size: \`2 ** 100\` has no overflow
- A \`float\` stores the nearest binary value, so \`0.1 + 0.2\` is not \`0.3\`
- Never compare floats with \`==\` when the decimals matter

### Converting between types
- \`int(3.9)\` gives \`3\`: it cuts off, it does not round`,
  narration:
    "An expression is any piece of code that produces a value, and the table shows ten of them with exactly what Python produces. Start with division, which comes in three forms. The single slash always gives a float, so seven divided by two is three point five, and even ten divided by two is five point zero, with a decimal point. The double slash divides and rounds down to a whole number, so seven double-slash two is three. Rounding down means toward minus infinity, so minus seven double-slash two is minus four, not minus three. The percent sign gives the remainder, so seven percent two is one. Double asterisk is the power, so two to the tenth is one thousand and twenty-four. When an expression has several operators, Python applies power first, then multiplication and division together, then addition and subtraction, and you can use parentheses to force a different order. Now the numbers themselves. An int is exact at any size: two to the hundredth power is a thirty-one digit number, with no overflow, limited only by memory. A float is different. Zero point one plus zero point two does not give zero point three. It gives zero point three followed by a long tail of zeros and a four. A float stores the nearest value it can represent in binary, and many decimal fractions simply have no exact binary form. This is not a bug in Python. On CPython, a float is a sixty-four bit binary floating-point number, and any language using that representation behaves the same way. That is also why comparing the sum to zero point three with a double equals gives False, so you should be careful comparing floats when the decimals matter. Finally, converting between types is something you ask for. Calling int on three point nine gives three, because it cuts off the decimal part rather than rounding. And calling float on the text two point five gives the number two point five. When money is involved, we will need something safer than float, and we will meet it later in the course.",
}
