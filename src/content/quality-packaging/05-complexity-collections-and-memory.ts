import type { Section } from '../types'

// Speed comparisons were each measured and are stated qualitatively (more than 100x for list-versus-set membership in a 200000-item collection, in this run). getsizeof byte counts are CPython 3.13 and labelled as such; they are not language guarantees.
export const complexityCollectionsAndMemory: Section = {
  id: 'complexity-collections-and-memory',
  title: "Algorithmic complexity, collection choices, and memory trade-offs",
  scene: 'complexity-choices',
  focus: 'choices',
  slide: `## Complexity, collections, and memory

**Complexity** describes how cost grows as the data grows.

### Membership and lookup
- \`x in a_list\` checks items **one by one**: cost grows with \`n\`
- \`x in a_set\` and a dict lookup are about **constant**
- With 200 000 items, the set was over **100 times** faster

### Adding and removing
- \`list.append\` is cheap; \`list.insert(0, x)\` shifts **every** item
- \`collections.deque\` is cheap at **both** ends

### Counting
- \`words.count(w)\` for each word is **n times n**
- \`collections.Counter\` counts in **one** pass

### Memory
- A list holds **all** its items; a generator keeps only its **state**
- Byte counts are **CPython** details`,
  narration:
    "Complexity describes how the cost of an operation grows as the data grows, and it explains why some collection choices from earlier chapters matter. Take membership. Asking whether a value is in a list makes Python compare the items one by one, so the cost grows with the length of the list. Asking whether a value is in a set, or whether a key is in a dictionary, uses hashing and takes about the same time however large the collection is. I measured it with a two hundred thousand item collection, looking for the last item, and the set was more than a hundred times faster. That is the real reason to prefer a set for many lookups. Adding and removing differ too. Appending to a list is cheap, but inserting at the front shifts every other item along, so it grows with the length. A deque, from the collections module, is cheap at both ends. Counting shows the cost of a nested pattern. Calling count on the list for each distinct word scans the list again every time, roughly n times n, while a Counter makes one pass, and in the test it was clearly faster. Memory has trade-offs too. A list stores every item, so its size grows with its length, while a range stores no items at all, and a generator keeps only its current state, so it stays small however many values it will produce. The byte counts in the card are what CPython three point thirteen reported, such as fifty-six bytes for an empty list. They are implementation details and will differ between versions, so use them to compare, not as promises. The advice is the same as before: choose the right structure first, measure when it matters, and do not optimise code that is not a bottleneck. Next, code that handles data it does not control.",
}
