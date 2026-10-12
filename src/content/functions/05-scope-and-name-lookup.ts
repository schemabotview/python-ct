import type { Section } from '../types'

// Enclosing scope is introduced only as 'an outer function's names'; closures that keep those names alive after the outer function returns belong to Chapter 9.
export const scopeAndNameLookup: Section = {
  id: 'scope-and-name-lookup',
  title: "Local, enclosing, global, and built-in name lookup",
  scene: 'scope-lookup',
  focus: 'scopes',
  slide: `## Scope and name lookup

A **scope** is the region where a name is visible.

### The lookup order (LEGB)
- **Local**: names assigned inside the function
- **Enclosing**: an outer function's names
- **Global**: names at module level
- **Built-in**: \`len\`, \`print\`, \`sum\`

### Consequences
- Locals vanish on return: \`tax\` is a \`NameError\` outside
- Reading a global works; **assigning** creates a new local
- \`count = count + 1\` raises \`UnboundLocalError\`

### Shadowing
- A variable named \`len\` hides the built-in \`len\`
- A nested function can **read** an enclosing name freely
- \`global\` exists, but passing arguments is clearer`,
  narration:
    "A scope is the region of a program where a name is visible, and when Python meets a name, it searches four places in a fixed order, remembered as L, E, G, B. First the local scope, the names assigned inside the running function. Then the enclosing scope, which holds the names of any outer function that this function is nested inside. Then the global scope, the names at the top level of the file. And finally the built-in scope, which holds the names Python itself provides, like len, sum, and print. The code card shows it in action. Inside with tax, price and tax are local, but rate is not assigned there, so Python finds it in the global scope, and the function returns twelve. Local names vanish when the function returns, so asking for tax afterwards is a NameError. Now the trap in the second function. Reading a global from inside a function is fine, but assigning to a name inside a function makes that name local for the whole function. So count equals count plus one tries to read a local count that has no value yet, and Python raises an UnboundLocalError. A function nested inside another can read the outer function's names without any special syntax. There is a global statement that lets a function assign to a global, but it makes code hard to follow, and passing arguments and returning results is almost always clearer. One more hazard is shadowing. If you name a variable len, you hide the built-in function len, and a later call to len fails because the name now refers to a number. Next, why we prefer functions that depend only on what they are given.",
}
