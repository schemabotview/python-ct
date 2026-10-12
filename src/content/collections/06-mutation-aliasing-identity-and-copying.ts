import type { Section } from '../types'

// The core mental-model section of the chapter: it extends the Chapter 1 name-to-object picture. Interning of small integers and strings is deliberately not shown; it is a CPython detail that muddies is versus ==.
export const mutationAliasingIdentityAndCopying: Section = {
  id: 'mutation-aliasing-identity-and-copying',
  title: "Mutation, aliasing, identity, equality, and copying",
  scene: 'aliasing-diagram',
  focus: 'a',
  slide: `## Mutation, aliasing, and copying

### Aliasing
- \`b = a\` makes a **second name** for the same list, not a copy
- Changing the list through \`b\` shows through \`a\`

### Identity versus equality
- \`==\` asks: do the objects hold the **same contents**?
- \`is\` asks: are they the **same object**?
- \`a.copy()\` is equal to \`a\`, but it is not \`a\`

### Shallow versus deep copies
- \`copy()\` and \`[:]\` copy only the **outer** list
- Inner lists stay shared: \`s[0].append(9)\` also changes \`m\`
- \`copy.deepcopy(m)\` copies every level

### Immutable objects
- Strings, numbers and tuples cannot change, so sharing them is safe`,
  narration:
    "This is the most important idea in the chapter, and it is the name-and-object picture from Chapter 1 doing real work. Read the code card. The name a refers to a list. Then b equals a does not create a second list. It creates a second name for the very same list. Next, c equals a dot copy creates a genuinely new list that happens to hold the same items. The diagram shows the result after we append four through the name b. The names a and b both reach the changed list, which now holds four items. The name c still reaches the separate copy, unchanged. This is called aliasing, and it explains many surprises: changing a list through one name changes it for every name that refers to it. Python gives you two different questions to ask. Double equals asks whether two objects hold the same contents, and is asks whether they are literally the same object. The copy is equal to the original, which prints True, but it is not the original, which prints False. Now a subtler trap. Copy, and slicing with colon, make a shallow copy, which copies only the outer list. If the list contains other lists, those inner lists are still shared. So appending nine to an inner list of the copy changes the original as well. When you need every level copied, the copy module provides deepcopy. Finally, strings, numbers and tuples cannot be changed, so sharing them is harmless. The danger is specific to mutable objects.",
}
