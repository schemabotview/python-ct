import type { Section } from '../types'

// Extends the Chapter 1 and Chapter 2 name-to-object picture across a call. The += versus = on a list distinction is verified: augmented assignment mutates, plain rebinding does not.
export const argumentBindingAndObjectSharing: Section = {
  id: 'argument-binding-and-object-sharing',
  title: "Argument binding, mutation, and object-sharing semantics",
  scene: 'call-binding',
  focus: 'diagram',
  slide: `## Argument binding and shared objects

### Binding
- Each parameter becomes a **new name** for the object passed in
- Nothing is copied

### Mutating
- \`order["coupon"] = ...\` changes the shared object, so the caller sees it
- \`items.append(x)\` works the same way

### Rebinding
- \`price = price * 2\` points the **local** name at a new object
- The caller's name is untouched

### The rule of thumb
- Mutating changes the object; assigning changes only a name
- \`items += [y]\` mutates a list; \`items = items + [y]\` rebinds`,
  narration:
    "This section applies the name-and-object picture to function calls. When you call a function, each parameter becomes a new name for the very object you passed in. Nothing is copied. In the code card, order and p are names in the caller. Calling add coupon with order creates a second name, the parameter order, for the same dictionary. The diagram shows both names pointing at one dictionary. When the function assigns a coupon into it, it changes that shared object, so the caller sees the change. This is mutation. Appending to a list that was passed in works the same way. Now consider raise price. The parameter price is a new name for the float four point five. When the function runs price equals price times two, it does not change the float. Floats cannot be changed. It calculates a new float, nine, and makes the local name price refer to it. The caller's name p still refers to four point five. This is rebinding, and it affects only the local name. So the rule of thumb is simple. Mutating changes the object, and everyone who shares it sees the change. Assigning to a name changes only that name. There is one subtle pair to remember with lists: items plus-equals a list mutates the list in place, so the caller sees it, but items equals items plus a list builds a new list and rebinds the local name, so the caller sees nothing. Next, where Python looks when it meets a name.",
}
