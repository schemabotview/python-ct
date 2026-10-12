import type { Section } from '../types'

// Lists reuse the indexing and slicing just taught. The table exists for one beginner trap: in-place methods return None, so assigning their result loses the list.
export const listsOrderedMutableCollections: Section = {
  id: 'lists-ordered-mutable-collections',
  title: "Lists: ordered mutable collections",
  scene: 'list-operations',
  focus: 'trace',
  slide: `## Lists: ordered, mutable collections

A **list** holds items in order, and it can change after it is created.

### Building and asking
- \`["tea", "mug", "tea"]\`; indexing and slicing work as for strings
- \`len(items)\`, \`"tea" in items\` and \`items.count("tea")\` ask questions

### Changing in place
- \`items[1] = "cup"\` replaces an item
- \`append\`, \`insert\`, \`pop\` and \`remove\` change the **same** list

### The trap
- Methods that change a list in place return \`None\`
- \`items = items.sort()\` leaves \`items\` as \`None\`
- Use \`sorted(items)\` when you want a new list

### Combining
- \`+\` joins two lists into a **new** list; \`*\` repeats one`,
  narration:
    "A list is Python's everyday collection. It holds items in order, written between square brackets, and unlike a string, it can change after it is created. Indexing and slicing work exactly as they did for strings, so items at index one is the second item, and a slice gives back a new list. The code card traces a list of ordered items through several changes. Append adds an item at the end. Assigning to an index replaces the item at that position. Pop removes the last item and hands it back to us, here the jar. Insert places a new item at a chosen position, here at the front. We can also ask questions: count tells us how many times tea appears, and index tells us where cup is. Notice that all of these changes happen to the same list object. Nothing new is created, and that is what mutable means. Now look at the table, because it holds the most common list mistake. Append, insert, remove and sort all change the list, and all of them return None, nothing at all. So if you write items equals items dot sort, you have just thrown your list away and replaced it with None. When you want a new, sorted list and want to leave the original alone, use the sorted function instead, which returns a brand new list. Finally, plus joins two lists into a new list, and multiplying a list by a number repeats it. Next, a collection that deliberately refuses to change.",
}
