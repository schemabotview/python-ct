import type { Section } from '../types'

export const itertoolsSection: Section = {
  id: 'itertools',
  title: 'itertools: groupby, chain and islice',
  scene: 'transform-itertools',
  narration:
    "The itertools module is a toolkit for working with iterators, and it fits our streaming pipeline perfectly. main dot py now starts by wrapping the row loop in a generator of its own, priced lines. It takes rows, and a list to put rejections in, and yields each valid line with its total attached, so validation and pricing happen lazily, one row at a time, as before. Then groupby. Given a stream and a key, groupby collects neighbouring items that share the same key into one group. Here the key is each line's date, fetched with itemgetter, a tidy way to say give me this field. Because the day files are read in date order, each day's lines arrive next to each other, and groupby hands them over one day at a time. The note at the bottom is the one rule to remember: groupby only groups neighbours, so its input must already be sorted by the key, or the same day would appear several times. The diagram at the top of the pane shows the whole chain: rows flow into priced lines, into groupby, and only the thirty one daily totals are kept. Nothing in the middle builds a list. Then islice, which takes the first few items of any iterable, like slicing a list, but without needing a list. The terminal uses it to preview the first three days: three hundred nine seventy, thirty seven forty, and two hundred sixty one forty. The REPL shows the third tool, chain, which joins several iterables end to end, so one product list followed by another reads as one list of three. Together these let the pipeline work on a month, or a year, in constant memory. Next, all of this becomes one step.",
}
