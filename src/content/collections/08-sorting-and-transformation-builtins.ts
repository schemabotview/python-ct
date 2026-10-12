import type { Section } from '../types'

// Key functions are previewed only with functions that already exist (len, str.lower). Writing a key function with def waits for Chapter 4, and lambda for Chapter 9.
export const sortingAndTransformationBuiltins: Section = {
  id: 'sorting-and-transformation-builtins',
  title: "Sorting and built-in functions",
  scene: 'sort-builtins',
  focus: 'sorting',
  slide: `## Sorting and built-in functions

### Summarising
- \`len\`, \`sum\`, \`min\` and \`max\` summarise a collection of numbers
- \`reversed(prices)\` walks backwards; wrap it in \`list()\`

### Sorting
- \`sorted(x)\` returns a **new** list; \`x.sort()\` returns \`None\`
- \`reverse=True\` flips the order
- Mixed types fail: \`sorted([3, "a"])\` raises a \`TypeError\`

### Key functions (preview)
- \`key=\` names a function applied to each item before comparing
- \`key=len\` orders by length; \`key=str.lower\` ignores case
- Sorting is **stable**: ties keep their original order
- Chapter 4 shows how to write your own key function`,
  narration:
    "Once data is in a collection, you often want to summarise or reorder it. The table shows the built-in functions for summarising a list of prices. Len gives the count, sum adds the numbers, and min and max find the smallest and largest. Reversed walks a list backwards, and wrapping it in list gives the reversed items. Now sorting, in the code card. The sorted function returns a new list in ascending order and leaves the original alone. Passing reverse equals True flips the order. Sorting needs items that can be compared, so a list mixing a number and a string raises a TypeError. The interesting part is the key argument. By default, Python compares the items themselves, but with a key, it applies a function to each item first and orders by the result. Sorting the words by len puts the shortest first. Notice that pear and kiwi both have four letters, and they stay in their original order, pear before kiwi. That is because Python's sort is stable, so ties never get shuffled. Another useful key is str dot lower, which ignores capital letters when comparing. Without it, all capitals sort before all lowercase letters, which is surprising. For now we use only functions that already exist. In Chapter 4, you will write your own key function, and then you can sort orders by their total.",
}
