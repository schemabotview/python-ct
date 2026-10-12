import type { Section } from '../types'

// Dataclass is explained as a decorator that writes methods, with the full decorator mechanism deferred to Chapter 9. The default_factory rule is the per-instance default lesson; annotations are stated not to check types.
export const dataclassesAndGeneratedMethods: Section = {
  id: 'dataclasses-and-generated-methods',
  title: "Dataclasses, generated methods, and per-instance defaults",
  scene: 'dataclass-generated',
  focus: 'code',
  slide: `## Dataclasses

\`@dataclass\` writes the routine methods of a data-holding class for you.

### What you write
- Field names with annotations: \`item: str\`, \`qty: int\`
- \`@dataclass\` is a **decorator**: it adds methods to the class

### What you get
- \`__init__\`, \`__repr__\` and \`__eq__\`, built from the fields
- \`frozen=True\` makes instances immutable

### Per-instance defaults
- A list default needs \`field(default_factory=list)\`
- \`lines: list = []\` raises a \`ValueError\`: it would be shared

### Notes
- Annotations name the fields; they do **not** check types
- \`replace(obj, qty=5)\` makes a modified copy`,
  narration:
    "Writing init by hand for every data-holding class is repetitive. The dataclass module removes the repetition. You put at-dataclass above the class and list the fields with annotations, and that decorator reads them and writes the methods for you. Again, we will see exactly how a decorator works in Chapter 9. The version of LineItem in the card has no init at all, yet LineItem of tea, three, four point five works, and it prints as LineItem, with item equals tea and so on, because a readable repr was generated too. A third generated method, eq, makes two instances equal when all their fields are equal, which a plain class would not do. The table lists what is written. Adding frozen equals True makes instances immutable, so assigning to a field raises a FrozenInstanceError, and a frozen instance can be used as a dictionary key. Now the per-instance default. If a field needs a list, you cannot write lines colon list equals an empty list. A dataclass refuses, raising a ValueError that says the mutable default is not allowed, because that one list would be shared, exactly as in the last section. Instead you write field with default factory equals list, which calls list afresh for each instance. Two notes. The annotations name the fields, but nothing checks the types, so a string in an int field is accepted. And the replace function makes a modified copy of an instance, which is useful with frozen ones. Next, building bigger objects from smaller ones.",
}
