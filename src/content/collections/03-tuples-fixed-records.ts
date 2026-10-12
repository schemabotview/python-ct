import type { Section } from '../types'

// Tuples are introduced as records, not as read-only lists, so the later unpacking and dictionary-key sections have a reason behind them.
export const tuplesFixedRecords: Section = {
  id: 'tuples-fixed-records',
  title: "Tuples: fixed records and immutable sequence structure",
  scene: 'tuple-vs-list',
  focus: 'record',
  slide: `## Tuples: fixed records

A **tuple** is an ordered sequence that cannot change after it is created.

### Building and reading
- \`("A-1001", "tea", 3, 4.5)\`; indexing and slicing work as for lists
- One item needs a comma: \`(3,)\` is a tuple, \`(3)\` is just \`3\`

### Why immutability helps
- Each position is a field: id, item, quantity, price
- \`order[2] = 4\` raises a \`TypeError\`
- A tuple can be a **dictionary key**: \`{order: 1}\` works
- A list cannot: \`{[1, 2]: 1}\` raises a \`TypeError\`

### Choosing
- **List** — many alike items that grow or change
- **Tuple** — a few fields of one thing, fixed in place
- The items inside a tuple can still be mutable objects`,
  narration:
    "A tuple looks like a list written with parentheses, and it supports the same indexing and slicing. The difference is that a tuple can never change after it is created. That sounds like a limitation, but it is what makes a tuple useful as a record. In the code card, the order is a tuple of an id, an item, a quantity and a price. Each position is a field with its own meaning, and because the tuple cannot change, the meaning of each position cannot be disturbed by accident. Trying to assign a new quantity raises a TypeError. There is one small piece of syntax to remember. A tuple with a single item needs a trailing comma. Three followed by a comma is a tuple holding one number, but three in plain parentheses is just the number three, because parentheses also group expressions. Immutability has a second benefit. Dictionaries, which we meet next, need keys that can never change underneath them. A tuple qualifies, so an order tuple can be used as a key. A list does not, and Python reports that a list is unhashable. The table sums up the choice. Use a list for many alike items that may grow or shrink, and a tuple for a few fields that belong together as one thing. One subtlety: a tuple itself cannot change, but if one of its items is a list, that list can still be changed. The tuple only guarantees which objects it holds.",
}
