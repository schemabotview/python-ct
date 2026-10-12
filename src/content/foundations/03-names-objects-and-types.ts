import type { Section } from '../types'

// The name-to-object model, introduced before any rule about it. Every later chapter on aliasing,
// argument passing and mutation is this picture with more arrows.
export const namesObjectsAndTypes: Section = {
  id: 'names-objects-and-types',
  title: 'Names, assignment, objects, and basic types',
  scene: 'names-to-objects',
  focus: 'price',
  slide: `## Names, assignment, and basic types

### The mental model
- A value is an **object**; a **name** is a label that refers to it
- \`price = 4.5\` makes the name \`price\` refer to a float object
- \`=\` binds a name. It is not the "equals" of arithmetic

### Five basic types
- \`int\` whole numbers · \`float\` decimals
- \`str\` text · \`bool\` True or False
- \`None\` the deliberate absence of a value

### Rebinding
\`price = 5.0\` points the name at a different object. The old object is not changed.

\`type(price)\` reports the type of the object.`,
  narration:
    "Here is the most important picture in this course. In Python, a value is an object that lives in memory, and a name is only a label that refers to an object. The diagram has names on the left and objects on the right. When we write price equals four point five, we do not put the number inside price. We create a float object holding four point five, and we make the name price refer to it. The equals sign here is called assignment. It binds a name to an object. It does not claim that two things are equal, the way it does in arithmetic. Every object has a type, and the five you will meet first are these. An int is a whole number, like three. A float is a number with a decimal point, like four point five. A str, short for string, is text, written between quotes, like tea. A bool is either True or False. And None is a special object that means there is deliberately no value, here for a coupon that was not supplied. You can ask any object for its type by calling type on the name that refers to it. Finally, a name can be rebound. If we later write price equals five point zero, the name price now refers to a different object, and the old four point five is left untouched. Keep this picture of names pointing at objects in mind, because chapters ahead will extend it rather than replace it.",
}
