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

### Without the conversion
\`"3" * 2\` is the text \`33\`, and \`"3" * 4.5\` raises a \`TypeError\`.`,
  narration:
    "Now the complete order-total program, with its input and its output. Read it top to bottom with me. Line one calls input with the prompt Quantity. Python shows that prompt, waits, and returns whatever the person typed. The crucial fact is that input always returns a str, a piece of text, even when the person typed digits. So after line one, the name text refers to the text three, not the number three. Line two fixes that by calling int on it, which converts the text into the whole number three. Line three gives price the float four point five. Line four multiplies, giving thirteen point five. Line five prints the answer using an f-string. An f-string is a string with the letter f in front of the opening quote, and anything inside curly braces is replaced by its value. After the value comes a colon and a format. Dot two f means a float with exactly two digits after the decimal point, so thirteen point five prints as thirteen point five zero. The terminal card shows one run, where the person typed three. Now the failure that makes this section worth learning. If we skip the int conversion, then three as text, multiplied by two, does not give six. It gives the text three, three, because multiplying text repeats it. And multiplying that text by the float four point five is rejected with a TypeError. The lesson is to always know whether a name refers to text or to a number, and to convert at the boundary where text comes in.",
}
