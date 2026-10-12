import type { Section } from '../types'

// The annotated order-total program with input and output. The failure contrast is the one every
// beginner meets: input() returns text, and text times a number is not arithmetic.
export const textInputAndFormattedOutput: Section = {
  id: 'text-input-and-formatted-output',
  title: 'Text input and formatted output',
  scene: 'order-run',
  focus: 'program',
  slide: `## Text input and formatted output

### Reading and writing
- \`input("Quantity: ")\` shows a prompt and returns what was typed
- It **always returns a \`str\`**, even for digits
- \`int(text)\` converts the text into a number
- \`print()\` writes text to the screen

### Formatting with an f-string
- \`f"Total: {total:.2f}"\` puts the value of \`total\` into the text
- \`:.2f\` means two digits after the decimal point
- \`{total:>8.2f}\` also right-aligns in 8 characters

### Without the conversion
- \`"3" * 2\` is the text \`33\`: repeating, not multiplying
- \`"3" + 1\` raises a \`TypeError\`
- \`int("3.5")\` raises a \`ValueError\`: not a whole number`,
  narration:
    "Now the complete order-total program, with its input and its output. Read it top to bottom with me. Line one calls input with the prompt Quantity. Python shows that prompt, waits, and returns whatever the person typed. The crucial fact is that input always returns a str, a piece of text, even when the person typed digits. So after line one, the name text refers to the text three, not the number three. Line two fixes that by calling int on it, which converts the text into the whole number three. Line three gives price the float four point five. Line four multiplies, giving thirteen point five. Line five prints the answer using an f-string. An f-string is a string with the letter f in front of the opening quote, and anything inside curly braces is replaced by its value. After the value comes a colon and a format. Dot two f means a float with exactly two digits after the decimal point, so thirteen point five prints as thirteen point five zero. Adding a greater-than sign and a width, as in eight dot two f, also right-aligns the number in a field eight characters wide. The terminal card shows one run, where the person typed three. Now the failure that makes this section worth learning, shown in the last card. If we skip the int conversion, then three as text, multiplied by two, does not give six. It gives the text three, three, because multiplying text repeats it. And adding the number one to that text is rejected with a TypeError, because Python will not mix text and numbers. Conversion can fail too: asking int to convert the text three point five raises a ValueError, because that text is not a whole number. The lesson is to always know whether a name refers to text or to a number, and to convert at the boundary where text comes in.",
}
