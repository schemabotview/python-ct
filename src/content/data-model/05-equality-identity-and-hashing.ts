import type { Section } from '../types'

// The lost-entry failure was verified: after mutating the key both the old and new lookups raise KeyError. Pure 1 == 1.0 hashing is included as the example of the contract holding across types.
export const equalityIdentityAndHashing: Section = {
  id: 'equality-identity-and-hashing',
  title: "Equality, identity, hashing, and collection-key contracts",
  scene: 'hash-contract',
  focus: 'keys',
  slide: `## Equality, identity, and hashing

### Two questions
- \`==\` asks for **equal values**: it calls \`__eq__\`
- \`is\` asks for the **same object**
- A plain class is equal only to itself

### The hash contract
- Equal objects **must** have equal hashes
- Defining \`__eq__\` alone makes a class **unhashable**: add \`__hash__\`
- A dict key's hash must **never change** while it is in use

### Mutable keys
- Mutating a key changes where it belongs: the entry is **lost**
- Use immutable keys: strings, tuples, frozen dataclasses

### Surprises
- \`1 == 1.0\` and they hash alike: \`{1: "a"}[1.0]\` works`,
  narration:
    "There are two different questions you can ask about two objects. Are they equal, meaning do they have the same value? And are they the same object? Double equals asks the first, and calls the object's eq method. The is operator asks the second. A plain class has no eq of its own, so it is equal only to itself. Dictionaries and sets need a third thing: a hash, a whole number computed from an object, used to find it quickly. They rely on a contract. If two objects are equal, they must have equal hashes. Python helps. The moment you define eq on a class without defining a hash method, Python sets the hash to None, and the class becomes unhashable. The first line of the card shows the TypeError. Adding a hash method that hashes the same data that eq compares restores it, and now equal keys find each other: the lookup returns a. The second half of the contract is that a hash must never change while the object is in use as a key. Look at the last lines. We put a key in a dictionary, then mutate it. The dictionary stored the entry under the old hash, so a lookup using the old value finds the right place but no longer matches, and a lookup with the new value looks in the wrong place. The entry is lost, and a KeyError is raised either way. That is why dictionary keys should be immutable: strings, tuples, or frozen dataclasses. The table summarises the types we know. Lists are unhashable. Dataclasses are unhashable unless frozen. And one subtle example of the contract at work: one equals one point zero, and their hashes match, so a dictionary lookup with a float finds an integer key. Next, how objects present themselves.",
}
