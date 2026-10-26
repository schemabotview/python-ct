import type { Section } from '../types'

export const pathlibSection: Section = {
  id: 'pathlib',
  title: 'pathlib: every day file in data/raw',
  scene: 'extract-pathlib',
  narration:
    "Naming each day's file by hand will not survive a month. The pathlib module represents file system paths as objects, and main dot py now uses one: RAW, a Path for the data slash raw folder. Its glob method finds every file whose name matches a pattern, here orders dash star dot csv, and sorted puts them in date order. The diagram at the top shows the three files it found, including a new third day. Paths come apart into useful pieces, and the REPL shows them for the first file: the full name, the stem, which is the name without its extension, and the suffix, dot csv. DAYS is now built from whatever files exist, using each file's stem, minus the word orders, as the date. A fourth file tomorrow will simply appear in the report. The read text function now uses the path's own read text method, and the run prints a total for each day instead of every line. But look closely at the output, in the table at the bottom of the pane. There is a new rejection: order ten twelve, with a quantity of B R A five hundred. That is not bad data from the shop. That is a bug in our program. The third day includes a customer recorded as smith, comma, kim, and because the name contains a comma, the CSV file puts it in quotes. Our code splits each line at every comma, so the name was cut in two, every value after it shifted one column to the right, and the product code landed in the quantity column. Validation caught it, which is good. But the fix belongs in the reading, not the checking. Next, a proper CSV reader.",
}
