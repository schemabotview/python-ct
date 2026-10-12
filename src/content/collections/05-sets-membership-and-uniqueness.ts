import type { Section } from '../types'

// Every set result is printed through sorted(): string hashing is randomised per run, so a bare set of strings would show a different order each time and the shown output would not be reproducible.
export const setsMembershipAndUniqueness: Section = {
  id: 'sets-membership-and-uniqueness',
  title: "Sets: membership, uniqueness, and set operations",
  scene: 'set-operations',
  focus: 'ops',
  slide: `## Sets: membership and uniqueness

A **set** is an unordered collection with no duplicates.

### Building
- \`{"tea", "mug"}\`; an empty set is \`set()\`, because \`{}\` is a dictionary
- \`set(["tea", "mug", "tea"])\` keeps one \`"tea"\`
- \`"tea" in ordered\` is a fast membership test

### Set operations
- \`a | b\` union · \`a & b\` intersection
- \`a - b\` difference · \`a ^ b\` in exactly one
- \`a <= b\` tests whether \`a\` is a subset

### No order, no index
- Never rely on printing order; use \`sorted(a & b)\`
- Items must be hashable, so a set cannot hold lists
- Drop duplicates in order with \`sorted(set(codes))\``,
  narration:
    "A set is a collection with two defining properties: it has no duplicates, and it has no order. You write one with curly braces, such as tea, mug, and jar. An empty set is the exception, because empty curly braces make an empty dictionary, so an empty set must be written as set with parentheses. Turning a list into a set removes duplicates, so the list with tea twice becomes a set of length two. Checking whether something is in a set is fast, which makes sets the right tool for membership questions. The real power is the operators, shown in the table for two sets: what we ordered, and what is in stock. The bar gives the union, everything in either set. The ampersand gives the intersection, the items in both. Minus gives the difference, so ordered minus in stock tells us what we ordered but cannot supply. And the caret gives items in exactly one of the two. Notice that every result in the table is wrapped in sorted. That is deliberate. A set has no order, so there is no index, and the order in which a set of strings prints can even differ from one run of the program to the next. If you need a stable display, sort it. As with dictionary keys, items must be hashable, so a set cannot contain a list. To drop duplicates and keep a stable order, write sorted of set of codes. Use a set when the question is membership or uniqueness, and a list when order matters.",
}
