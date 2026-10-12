import type { Section } from '../types'

// The central surprises are that CSV gives strings for everything and that JSON quietly changes tuples and integer keys. Both are shown with their real output.
export const csvAndJson: Section = {
  id: 'csv-and-json',
  title: "CSV and JSON: parsing, record shapes, and serialization limits",
  scene: 'csv-json',
  focus: 'parse',
  slide: `## CSV and JSON

### CSV
- \`csv.DictReader\` gives one dictionary per row, keyed by the header
- **Every value is a string**, including numbers
- Open with \`newline=""\` so quoted line breaks survive

### JSON
- \`json.loads\` and \`json.dumps\` convert between text and objects
- Numbers, booleans and \`null\` (\`None\`) round-trip

### Files
- \`json.dump(obj, f)\` writes to a file; \`json.load(f)\` reads one

### Limits
- Tuples come back as **lists**; integer keys become **strings**
- Sets, \`Decimal\` and dates raise a \`TypeError\`
- Bad input raises \`JSONDecodeError\``,
  narration:
    "Two formats cover most structured data. The first is CSV, comma-separated values, the format a spreadsheet exports. The top card shows an orders file: a header row, then one order per line. The csv module's DictReader reads it and gives one dictionary per row, keyed by the column names from the header. Look at the first row in the code card. The quantity is the text three, not the number three, and the price is the text four point five. CSV has no types, so every value arrives as a string, and converting them is your job. Open the file with newline set to an empty string, so the reader can handle quoted fields that contain line breaks, and the writer in the same module adds quotes around any value that contains a comma. The second format is JSON, which is text that looks like Python dictionaries and lists. The loads function turns JSON text into Python objects, and dumps does the reverse. JSON keeps numbers as numbers, true and false as booleans, and null becomes None. But JSON has fewer types than Python, and the translation has limits. A tuple becomes a JSON array, so it comes back as a list. A dictionary key must be text, so an integer key comes back as a string. Sets, decimals, and dates have no JSON form at all, and dumps raises a TypeError, so you must convert them yourself first. For files, dump and load do the same job as dumps and loads but read and write a file object directly, and ensure ascii set to False keeps accented characters readable instead of escaping them. And malformed JSON raises a JSONDecodeError. Remember: parsing a format is not the same as validating the data. Next, what to do when something raises.",
}
