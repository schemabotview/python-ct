import type { Section } from '../types'

// Eager versus lazy is shown by a pipeline that prints at each stage, so the interleaving is evidence. The consumed-iterator surprise is the standard failure of reusing a generator.
export const lazyPipelinesAndItertools: Section = {
  id: 'lazy-pipelines-and-itertools',
  title: "Lazy pipelines, one-shot consumption, and itertools concepts",
  scene: 'lazy-pipeline',
  focus: 'pipe',
  slide: `## Lazy pipelines and itertools

### Lazy versus eager
- A list comprehension does **all** the work now, and stores the results
- A generator does **one item** at a time, when asked

### Pipelines
- Each item travels through **every** stage before the next is read
- Nothing runs until something calls \`next\`

### One-shot
- A consumed generator is empty: the second \`list(totals)\` gives \`[]\`
- Keep a list if you need to loop twice

### itertools
- \`islice\`, \`count\`, \`chain\`, \`accumulate\`, \`pairwise\`, \`batched\`, \`groupby\`
- Lazy building blocks that return iterators
- \`groupby\` only groups **neighbours**: sort first`,
  narration:
    "Generators become powerful when you chain them. In the card, read rows yields lines of text one at a time, and parse takes any iterable of rows and yields them split into pieces. Both print as they work. We connect them by passing one to the other, and nothing happens at all yet, because nothing has asked for a value. Now watch the two calls to next. The first one asks parse for a value. Parse asks read rows for a row, which prints read tea and yields it. Parse prints parse tea, and yields the split row. So each item travels through every stage before the next item is even read. Only then does the second next call read mug. The work is interleaved, one item at a time, instead of reading all the rows and then parsing all the rows. That is lazy evaluation. The table contrasts it with eager evaluation, where a list comprehension does all the work up front and keeps every result in memory. Laziness saves memory, can work with endless sources, and does only the work that is needed. The price is that a generator is one-shot. In the second example, listing the totals gives thirteen point five and eight, and listing the same generator again gives an empty list, because it was already consumed. If you need to loop twice, keep a list. The itertools module is a toolbox of lazy building blocks. Count produces endless numbers, islice takes a slice from any iterator, chain joins iterables, accumulate gives running totals, pairwise gives neighbouring pairs, and batched groups items in fixed sizes. Groupby groups only neighbouring equal items, so sort first. Next, guaranteeing cleanup.",
}
