import type { Section } from '../types'

export const jsonSection: Section = {
  id: 'json',
  title: 'JSON: the catalogue as a file',
  scene: 'extract-json',
  narration:
    "The shop keeps its product list in a file called catalogue dot json, which now sits beside the order files, and it includes the Brazilian coffee at sixteen twenty five. JSON is the most common format for structured data passed between programs: objects in curly braces, lists in square brackets, strings, numbers, true, false and null. Python's json module turns it into the types you know, and the diagram at the top of the pane shows the mapping. A JSON object becomes a dictionary, a string becomes a str, and a number becomes an int or, if it has a decimal point, a float. That last mapping is why the shop's file writes every price as a string. A float would bring back the binary rounding errors from course three. As a string, nine point nine five arrives exactly, and main dot py's new read catalogue function turns each one into a Decimal and freezes the result, just as before. The table in the middle shows the catalogue as it was read. The constant typed into the program is gone. In the REPL, the Brazilian coffee is now there, at sixteen twenty five, as a Decimal. And the run shows the effect: both Brazilian lines, order ten oh six on the first day and order ten twelve on the third, are priced, and only one line is still rejected, the quantity three. The day totals have changed to match. Nothing in the pricing code had to change for this. That is what separating data from code buys you: the next time the shop adds a coffee or changes a price, it edits a file, and the program is untouched. Next, the shop's mistakes multiply, and the pipeline needs a proper gate.",
}
