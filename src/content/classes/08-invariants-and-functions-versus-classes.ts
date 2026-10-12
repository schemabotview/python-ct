import type { Section } from '../types'

// Closes the chapter and carries the bridge to Chapter 8. A leading underscore is shown to be a convention that is not enforced; properties, which can enforce, wait for Chapter 8.
export const invariantsAndFunctionsVersusClasses: Section = {
  id: 'invariants-and-functions-versus-classes',
  title: "Object invariants, validation boundaries, and choosing functions versus classes",
  scene: 'invariants',
  focus: 'guard',
  slide: `## Invariants and when to use a class

An **invariant** is a rule that must always hold, such as \`qty > 0\`.

### Protecting it
- Validate in \`__init__\`, or in \`__post_init__\` for a dataclass
- \`frozen=True\` stops later changes
- Methods such as \`add()\` can reject wrong types

### Limits of convention
- A leading underscore (\`_lines\`) means "internal"; Python does **not** enforce it
- Code that reaches in can still break the rule

### Function or class?
- The table lists the usual choices

### Where to validate
- At the **boundary**, where data enters
- Trusted objects can then rely on their invariants`,
  narration:
    "An invariant is a rule that must always be true for an object, such as a line item's quantity being positive. The best protection is to make a bad object impossible to create. In the card, the line item is a frozen dataclass with a post init method, which runs right after the generated init. If the quantity is not positive, it raises a ValueError with a clear message. So the first call builds a line, and the second, with a quantity of zero, is refused before any bad object exists. Because the class is frozen, nobody can change the quantity later to something invalid. Methods can protect invariants too. An order's add method can check that it is given a line item, and raise a TypeError otherwise. But be honest about the limits. By convention, a name starting with an underscore, like underscore lines, means internal, hands off. Python does not enforce that. Code that reaches in and appends a string to the list can still break the order, and the failure shows up later, far from the cause. In the next chapter, you will see properties, which can enforce rules on attribute access. The last question is whether to write a class at all. The table gives a guide. A single calculation with no stored state is best as a function. Fixed fields with little behaviour suit a dataclass or a tuple. State that must stay valid across calls suits a class that guards it. And interchangeable behaviours can be functions or small classes. Validate at the boundary where data enters, and trusted objects can rely on their invariants. Objects now model the domain. Next, we connect their behaviour to the protocols used by Python's own syntax and built-ins.",
}
