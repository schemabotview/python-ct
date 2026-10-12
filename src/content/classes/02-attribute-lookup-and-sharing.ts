import type { Section } from '../types'

// The shared-list mistake is the chapter's counterpart of the mutable-default trap in Chapter 4. The self.count += 1 behaviour was verified: the instance gains its own count and the class value stays 0.
export const attributeLookupAndSharing: Section = {
  id: 'attribute-lookup-and-sharing',
  title: "Attribute lookup; instance versus class attributes",
  scene: 'shared-attribute',
  focus: 'code',
  slide: `## Instance versus class attributes

### Two places for data
- **Instance** attributes are set on \`self\`: one set per object
- **Class** attributes are set in the class body: shared by all

### Lookup order
- Python looks on the **instance** first, then the **class**
- Reading \`RATE\` through an instance finds the class value
- Assigning \`t.RATE = 0.2\` creates an **instance** attribute that hides it

### The shared-list mistake
- \`items = []\` in the class body is **one** list for every instance
- Fix: \`self.items = []\` inside \`__init__\`

### A quieter trap
- \`self.count += 1\` reads the class value, then stores an **instance** one`,
  narration:
    "Data can live in two places. Instance attributes are set on self and belong to one object. Class attributes are written in the class body, outside any method, and belong to the class, so every instance shares them. When you read an attribute, Python searches in order: first the instance's own attributes, then the class. That is why a constant such as a tax rate, defined once on the class, can be read through any instance. But if you assign through an instance, you do not change the class value. You create a new instance attribute that hides it. The card shows the mistake that follows from this. The class Basket has items equals an empty list in its body, which is a class attribute, so there is exactly one list. The add method appends to self dot items, which finds that one list through the class. So after a adds tea, the second basket b also contains tea, and vars of a is empty, because nothing was ever stored on the instance. The diagram shows both names reaching the same list. This is the class version of the mutable default trap from Chapter 4, and the fix is the same idea: create the list in init, so every instance gets its own. A quieter trap involves numbers. If a class has count equals zero and a method does self dot count plus-equals one, Python reads the class value, adds one, and stores the result as a new instance attribute. After two calls, the instance says two, and the class still says zero. If you want a counter shared by everyone, update it through the class name. Next, what a method really is.",
}
