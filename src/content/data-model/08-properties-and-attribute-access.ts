import type { Section } from '../types'

// Delivers the enforcement promised in Chapter 7's invariants section. The descriptor model is conceptual (a class attribute with __get__ and __set__) and verified with a small Desc class; implementation detail is not pursued.
export const propertiesAndAttributeAccess: Section = {
  id: 'properties-and-attribute-access',
  title: "Properties, attribute access, and a conceptual descriptor model",
  scene: 'property-access',
  focus: 'prop',
  slide: `## Properties and attribute access

### Property
- \`@property\` makes a method read like an attribute: \`line.total\`
- A **setter** runs on assignment: validation lives there
- With no setter, assignment raises \`AttributeError\`

### Keeping the invariant
- \`self.qty = qty\` in \`__init__\` also goes through the setter
- The value is stored as \`_qty\`, so the names do not clash

### How it works: descriptors
- A property is a **descriptor**: a class attribute with \`__get__\` and \`__set__\`
- \`__getattr__\` is a fallback for **missing** names only

### When to use one
- Start with plain attributes; add a property when a rule appears`,
  narration:
    "In Chapter 7, we said an underscore only means keep out, and that Python cannot enforce a rule on plain attributes. Properties can. A property looks like an attribute from the outside, but runs code on access. In the card, qty is defined as a property with a getter, which just returns the stored value, and a setter, which checks the new value and raises a ValueError unless it is positive, and only then stores it. The stored value lives under the name underscore qty, so the property and the storage do not clash. Notice the line in init. Self dot qty equals qty looks like a plain assignment, but it goes through the setter, so even the constructor cannot create an invalid line item. The table shows the effects. Assigning zero raises the ValueError. A second property, total, has no setter and is computed each time from the quantity and price, and you read it without parentheses. Trying to assign to it raises an AttributeError saying the property has no setter. And the instance dictionary shows underscore qty, not qty. How does this work? A property is an example of a descriptor, which is an object stored on the class that defines get and set methods. When you read or write an attribute with that name, Python calls those methods instead of touching the instance dictionary. You can write your own descriptors, but properties cover almost every case. A separate hook, getattr, is a fallback that runs only when a name is not found at all. As a rule, start with plain attributes, and add a property only when a rule or a computation appears. Next, when objects disappear.",
}
