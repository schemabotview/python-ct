import type { Section } from '../types'

// Method resolution order is explained conceptually as a search order; the diamond case is mentioned but not drawn. Forgetting super().__init__ was verified to leave the attributes unset.
export const inheritanceOverridingAndSuper: Section = {
  id: 'inheritance-overriding-and-super',
  title: "Inheritance, overriding, super, and a conceptual method-resolution order",
  scene: 'inheritance-chain',
  focus: 'code',
  slide: `## Inheritance, overriding, and super

A subclass **is a** parent class, with changes.

### Writing one
- \`class BulkLineItem(LineItem):\` inherits everything
- A method with the same name **overrides** the parent's
- \`super().total()\` calls the parent's version

### Method lookup (MRO)
- Python searches the class, then its parents, in a fixed order: the **method resolution order**
- \`BulkLineItem.__mro__\` lists it, ending at \`object\`
- With several parents, Python **computes** the order

### Take care
- Override \`__init__\` without calling \`super().__init__\`: attributes go missing
- Inherit only for a true "is a"; otherwise compose
- \`isinstance\` accepts subclasses; \`type(b) is LineItem\` does not`,
  narration:
    "Sometimes one kind of object really is a special case of another. A bulk line item is a line item, with a discount. Inheritance expresses that. In the card, the class BulkLineItem names LineItem in parentheses, so it inherits everything LineItem has: the init, and the total method. It then overrides total by defining its own method with the same name. Inside the override, super dot total calls the parent's version, so we reuse the basic calculation and then apply a ten percent discount if the quantity is at least ten. For ten teas at four point five, the base is forty-five, and the answer is forty point five. For three teas there is no discount. How does Python find a method? It searches a fixed list of classes, called the method resolution order. For a bulk line item, that is BulkLineItem first, then LineItem, then object, the class that every class ultimately inherits from. The diagram shows that chain, and you can see it with the dunder mro attribute. When a class has several parents, Python computes the order following consistent rules, so a method is never found in two places by accident. Two ways to check relationships: is instance is True for a subclass instance, while asking for the exact type with type of b is LineItem is False. And super follows the method resolution order rather than simply meaning the parent, so with a class D inheriting from B and then C, a call chain visits D, then B, then C, then their shared parent. Now two cautions. If you override init in a subclass and forget to call super dot init, the parent's setup never runs, and the object lacks attributes, leading to an AttributeError later. And inherit only when the relationship is truly is-a. A bulk line item is a line item, so it is a good fit. An Order is not a line item, so it holds them instead. Next, using different objects through the same call.",
}
