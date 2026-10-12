import type { Section } from '../types'

// Introduces the four words (class, instance, attribute, __init__) that every later section uses. The default repr with a memory address is deliberately not shown, since it varies between runs.
export const classesInstancesAndConstruction: Section = {
  id: 'classes-instances-and-construction',
  title: "Classes, instances, construction, and instance state",
  scene: 'class-anatomy',
  focus: 'cls',
  slide: `## Classes, instances, and construction

A **class** is a blueprint; an **instance** is one object built from it.

### Making an instance
- \`LineItem("tea", 3, 4.5)\` calls the class: Python creates the object, then runs \`__init__\`
- \`__init__\` stores **instance state**: \`self.qty = qty\`
- \`self\` is the new instance itself

### Reading and changing state
- \`line.qty\` reads an attribute; \`line.qty = 4\` changes it
- \`vars(line)\` shows an instance's attributes
- Each instance has its **own** state
- Attributes can be added later, so a typo like \`line.qyt = 5\` quietly creates a new one

### Checking
- \`isinstance(line, LineItem)\` is \`True\`
- A missing argument raises \`TypeError\`; a missing attribute, \`AttributeError\``,
  narration:
    "So far, an order line has been a tuple or a dictionary. A class lets us define our own kind of object, with its own data and its own behaviour. A class is a blueprint, and an instance is one object built from that blueprint. In the code card, the class LineItem has one method, named init with double underscores, and it is the constructor. When we write LineItem of tea, three, four point five, Python does two things. It creates a new, empty LineItem object, and then it calls init, passing the new object as the first argument, which is conventionally named self. So self is the new instance itself. The three assignments store the item, the quantity, and the price as attributes on that instance, and together they are the instance's state. We read an attribute with a dot, so line dot qty is three. We can change one the same way, so line dot qty equals four updates it. The built-in vars function shows all of an instance's attributes as a dictionary. Python also lets you add attributes later, so a typo such as qyt instead of qty does not fail, it quietly creates a new attribute. Every instance has its own state, so creating a second line item for a mug does not affect the first. Is instance asks whether an object was built from a given class, and for our line it is True. Two mistakes are worth knowing. Forgetting an argument raises a TypeError naming the missing one, because init is an ordinary function with parameters. And asking for an attribute that was never set raises an AttributeError. The table collects the four words for this section: class, instance, attribute, and init. Next, where attributes live, and a very common surprise about sharing.",
}
