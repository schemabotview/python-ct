import type { Section } from '../types'

// The three strategy classes share no parent on purpose, to show that duck typing needs a shared method name, not shared ancestry. Passing the class instead of an instance raises TypeError, verified.
export const polymorphismAndDuckTyping: Section = {
  id: 'polymorphism-and-duck-typing',
  title: "Polymorphism and duck typing across interchangeable behaviours",
  scene: 'strategies',
  focus: 'code',
  slide: `## Polymorphism and duck typing

### Polymorphism
- One call, \`strategy.price(qty)\`, behaves differently per object
- \`order_cost\` never checks which strategy it received

### Duck typing
- "If it has \`price()\`, it works": no shared parent needed
- Python looks for the method **at call time**

### Failure
- A wrong object raises \`AttributeError\` when the call happens
- Passing the **class** instead of an instance raises \`TypeError\`

### Design
- The caller depends on a **behaviour**, not a type
- Built-ins work this way: \`len\` accepts anything with a length`,
  narration:
    "Polymorphism means one call can do different things depending on the object. We have three pricing strategies, written as three small classes: PerUnit charges four point five each, Bulk takes ten percent off at ten or more, and Flat charges twenty regardless. They are unrelated classes. They share no parent, only a method name, price. The function order cost takes a strategy and a quantity and simply calls strategy dot price of quantity. It never asks what kind of strategy it received. The table shows the three answers for three items and for ten. This works because of duck typing, from the saying: if it walks like a duck and quacks like a duck, treat it as a duck. Python does not check an object's type before a call. It looks for the method when the call happens, so any object with a price method works. That makes code flexible: to add a new strategy, you write a new class, and order cost needs no change. The failure mode is that a wrong object is discovered late. Passing the text tea raises an AttributeError, saying the string has no attribute price, but only when order cost runs. Passing the class itself instead of an instance fails differently, with a TypeError about a missing argument, because price was called without a self. The design lesson is that the caller depends on a behaviour, not on a type. Python's built-ins work this way too: len accepts anything that has a length. Next, deciding what rules a class must protect, and when not to use a class at all.",
}
