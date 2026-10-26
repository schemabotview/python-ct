import type { Section } from '../types'

export const formatting: Section = {
  id: 'formatting',
  title: 'Formatting with f-string specs',
  scene: 'load-formatting',
  narration:
    'The terminal output has so far been whatever print produced, with numbers wherever they happened to land. A report is easier to read when it lines up, and f-strings can do that with a format spec: a short code after a colon inside the braces. main dot py now prints a small table. Each row uses the same three specs. The product gets less than ten, which means left aligned in ten characters. The revenue gets greater than twelve comma dot two f, and the bags get greater than six. The pane on the right takes the revenue spec apart. The greater than sign aligns right. Twelve is the minimum width, so shorter values are padded with spaces. The comma adds a thousands separator. Dot two means two digits after the point, and the f means fixed point notation, an ordinary decimal number rather than scientific notation. Because every row uses the same widths, the columns line up, with text on the left and numbers on the right, which is how people read tables. The REPL shows a spec on its own. Square brackets around the result make the padding visible: four thousand four hundred sixty point nine becomes four spaces, then four comma four sixty point nine zero, exactly twelve characters. And the word KEN, left aligned in six, gets three spaces after it. The specs work on Decimal values too, so the money is never turned into a float just to print it. Formatting happens at the last moment, when a number becomes text for a person. The data underneath keeps its full precision, and only the display is rounded. Next, an output for programs instead of people.',
}
