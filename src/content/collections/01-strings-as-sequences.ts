import type { Section } from '../types'

// Opens the collections chapter with the sequence the learner already has: text. Indexing and slicing are taught here once and reused for lists and tuples.
export const stringsAsSequences: Section = {
  id: 'strings-as-sequences',
  title: "Strings as sequences",
  scene: 'string-sequence',
  focus: 'cells',
  slide: `## Strings as sequences

A **string** is an ordered sequence of characters, so every character has an index.

### Indexing
- Counting starts at **0**: \`sku[0]\` is \`'t'\`
- Negative indexes count from the end: \`sku[-1]\` is \`'g'\`
- An index past the end raises an \`IndexError\`

### Slicing
- \`sku[start:stop]\` includes \`start\` and **excludes** \`stop\`
- Either end may be left out: \`sku[:3]\` is \`'tea'\`
- \`sku[::-1]\` reverses; a slice never raises an error

### Transforming
- Methods such as \`upper()\` and \`split("-")\` return a **new** string
- Strings are **immutable**: \`sku[0] = "T"\` raises a \`TypeError\``,
  narration:
    "Our order system identifies each product with a code, like tea dash two fifty g. A string is more than a blob of text. It is an ordered sequence of characters, and the table shows exactly that: one column per character, each with a position. Python counts positions from zero, so the first character, t, is at index zero, and the last, g, is at index seven. You can also count from the end using negative numbers, so index minus one is always the last character. Ask for an index that does not exist and Python raises an IndexError. Slicing takes a piece of the string. You write start, a colon, and stop, and the slice includes the start position but excludes the stop position. So the slice from the beginning up to three gives t, e, a, which is tea, and the slice from four onwards gives two fifty g. You can leave either end out, and unlike a single index, a slice that runs past the end does not fail, it just gives what is there, even an empty string. Adding a second colon and a step of minus one walks backwards, which reverses the string. Strings also come with methods, which are operations you call with a dot. Upper makes capitals, and split cuts the string wherever it finds a separator and gives back a list. The key point is that every one of these returns a new string. Strings are immutable, meaning an existing string can never be changed in place. Trying to assign a new letter to position zero raises a TypeError. Lists, which come next, behave very differently.",
}
