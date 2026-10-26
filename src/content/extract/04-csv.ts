import type { Section } from '../types'

export const csvSection: Section = {
  id: 'csv',
  title: 'CSV: csv.DictReader',
  scene: 'extract-csv',
  narration:
    "CSV looks simple enough to parse by hand, and the last section showed why you should not. The format has rules: a value containing a comma is wrapped in double quotes, a quote inside a value is doubled, and a value can even contain a line break. Python's csv module knows all of them, and main dot py now uses its DictReader. read day hands it the file's lines, and DictReader does what our zip loop did, turning each row into a dictionary keyed by the header, except that it does it correctly. The diagram at the top of the right hand pane puts the two side by side, for order ten twelve. Splitting at every comma gives six pieces, with the customer's name broken across two of them. The csv reader gives five fields, with the customer exactly as written: smith, comma, kim. In the REPL, the last row of the third day confirms it. With the reading fixed, the run tells the truth about order ten twelve. It is still rejected, but now for its real reason: four bags of B R A five hundred, a product our catalogue does not have. The Brazilian coffee has come up twice now, and both times the problem is the same. The shop has started selling it, and our catalogue, still typed into main dot py, has not caught up. Every time a price changes or a product is added, someone has to edit the program. That is a sign the catalogue does not belong in the code at all. It is data, and data lives in files. Next, the catalogue moves into a file of its own.",
}
