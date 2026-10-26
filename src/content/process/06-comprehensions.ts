import type { Section } from '../types'

export const comprehensions: Section = {
  id: 'comprehensions',
  title: 'Comprehensions',
  scene: 'process-comprehensions',
  narration:
    "Some loops exist only to build a collection, and Python has a compact form for those: the comprehension. The orders now span two days. DAYS holds the first of October's list and a second day with one more line, and the pipeline should process them all. The first comprehension, the highlighted line under the data, flattens them into a single list. It reads: star day, for each day in the values of DAYS. The star unpacks each day's list into the new one, so two lists become one list of six lines. Unpacking inside a comprehension is new in Python three point fifteen, and the diagram at the top of the pane draws it. The loop now collects each priced line, with its total, into a list called priced. After the loop, three more comprehensions summarise it, each in one line. The bags are the sum of each line's quantity. The customers are a set, written with curly braces, of each line's customer, so the duplicate Maya disappears, and sorted turns the set into a list in alphabetical order. The table in the middle of the pane shows how to read one. It is a loop written backwards: what to keep comes first, then the for that produces it. The terminal shows the result of all that: a total of two hundred ninety four seventy across the two days, nineteen bags, one skipped line, and three customers. Comprehensions are at their best when they say one simple thing. If you find yourself writing conditions inside conditions, or a comprehension that does several jobs, write the loop instead: it will be easier to read. Next, the pricing becomes a piece we can name.",
}
