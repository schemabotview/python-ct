import type { Section } from '../types'

export const filesAndWith: Section = {
  id: 'files-and-with',
  title: 'Files and with',
  scene: 'extract-files',
  narration:
    "Until now, the orders were typed into the program. Real orders come from the shop, as one file per day, and this course is about reading them. The explorer shows a new folder, data slash raw, holding the first day's file, a CSV: a header line naming the columns, and one line per order. main dot py now opens it. The key line starts with the word with: with open the file, as file. Inside that block, the program reads the first line, the header, splits it at the commas, and then loops over the remaining lines, pairing each line's values with the header's names. The diagram in the middle of the right hand pane shows that pairing for the first order: zip puts the five column names beside the five values, and dict turns the pairs into the same kind of dictionary we used before. Why with? A file you open must be closed, or the operating system keeps it open, and on a busy machine that eventually fails. The with statement closes it for you when the block ends, and the diagram at the top shows the important part: it closes it even if an error happens inside the block. In the REPL, after the script has run, file dot closed is True. Notice one more thing in the editor. Everything read from a file is text. The quantity three arrives as the string three, so the program converts quantities made of digits into integers before pricing. The word three stays text, and is still rejected. The terminal shows the same totals as at the end of the last course, which is exactly the point: the data moved into a file, and the answers did not change. Next, a file that is not quite what it seems.",
}
