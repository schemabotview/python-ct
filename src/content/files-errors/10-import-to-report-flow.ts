import type { Section } from '../types'

// Integrates the chapter: pathlib-free for brevity, but with, DictReader, Decimal from strings, narrow handlers, else for the success path. The bridge into Chapter 6 is in the narration.
export const importToReportFlow: Section = {
  id: 'import-to-report-flow',
  title: "Worked import-to-report flow: valid records, rejected records, and output",
  scene: 'import-report',
  focus: 'program',
  slide: `## An import-to-report flow

### The five input rows
- A-1001 and A-1005 are valid
- A-1002 has quantity \`x\`; A-1003 has **no price**; A-1004 has price \`abc\`

### What the program does
- Reads with \`DictReader\` inside \`with\`; parses each row in \`try\`
- \`else\` keeps the good rows; \`except\` records the reason
- Money is \`Decimal\` built from strings, so the total is exact

### What it reports
- Counts of valid and rejected rows, the exact total, each rejection

### Why this shape
- Reading, validating and reporting are separate steps
- Next, they become separate modules`,
  narration:
    "Now we put the chapter together. The input file has five orders. Two are valid, A one thousand one and A one thousand five. The others each fail differently: A one thousand two has the quantity x, A one thousand three has no price at all, and A one thousand four has the price abc. Read the program in the top card. It opens the file with a with statement, naming the encoding and setting newline, and reads it with DictReader. For each row, the try block converts the quantity with int and the price with Decimal, built from the string. The except clause is narrow. It names ValueError, which int raises for the x, TypeError, which Decimal raises for the missing price because the short row gave None, and InvalidOperation, which Decimal raises for abc. When one of these occurs, we record the order id and the name of the exception type. The else block runs only when the conversion worked, and it keeps the order id with the exact line total, the quantity times the price. After the loop, we add up the good amounts and print a report: one summary line with the counts and the total, and one line for each rejection. The terminal card shows the result: two valid, three rejected, a total of eighteen, which is thirteen point five zero plus four point five zero, and the reason for each rejection. Notice what we did not do: we did not crash on bad data, we did not silently skip it, and we did not use a float for money. This program does reading, validating, and reporting in one place, and it is getting crowded. The script now has several responsibilities. Next, we organise code and dependencies without relying on one large file.",
}
