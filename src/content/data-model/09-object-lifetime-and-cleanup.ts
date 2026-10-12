import type { Section } from '../types'

// Every printed behaviour here is CPython's and the slide and scene say so; the table separates language guarantees from implementation details. Garbage collection is explicitly not offered as a way to release files or locks. The bridge into Chapter 9 is in the narration.
export const objectLifetimeAndCleanup: Section = {
  id: 'object-lifetime-and-cleanup',
  title: "Object lifetime, references, garbage collection, and explicit cleanup boundaries",
  scene: 'lifetime',
  focus: 'refs',
  slide: `## Object lifetime and cleanup

### References keep objects alive
- An object lives while something refers to it
- CPython **counts** references: \`sys.getrefcount\` reads one extra for the call
- At zero, CPython frees the object at once: a **CPython detail**

### Cycles
- Objects that refer to each other keep their counts above zero
- CPython's cycle collector (\`gc\`) finds them later

### \`__del__\` and weak references
- When \`__del__\` runs is **not guaranteed** by the language
- \`weakref.ref(obj)\` does not keep the object alive

### Cleanup you can rely on
- \`with\` and \`close()\` run when **your code** says so
- Never depend on garbage collection to release files or locks`,
  narration:
    "The last topic in this chapter is when objects stop existing. An object lives as long as something refers to it. In CPython, the standard interpreter, each object keeps a count of its references. The sys dot getrefcount function reads it, and it reports one more than you might expect, because passing the object to the function creates a temporary reference. So a list with one name shows two, and with a second name, three. When the count reaches zero, CPython frees the object immediately. The card demonstrates it with a class whose del method prints a message. Creating one and deleting its only name prints del one at once. But be clear: this immediate behaviour is a detail of CPython, not a promise made by the Python language, and other implementations free objects differently. Reference counting has a weakness. Two objects that refer to each other, a cycle, keep each other's counts above zero. In the card, deleting both names prints nothing, and the two objects linger until CPython's cycle collector, run here by calling gc dot collect, finds them and prints del two and del three. The del method is a poor place for cleanup, because the language does not guarantee when, or even whether, it runs. A weak reference lets you refer to an object without keeping it alive, and it returns None once the object is gone. The table separates what you can rely on from what you cannot. Counts reaching zero and the cycle collector are CPython details, and when del runs is not guaranteed. What is guaranteed is your own code: with blocks and explicit close calls run exactly when you say. So never depend on garbage collection to release a file or a lock. Protocols let objects cooperate. Next, we use functions themselves as composable objects and make interfaces more explicit.",
}
