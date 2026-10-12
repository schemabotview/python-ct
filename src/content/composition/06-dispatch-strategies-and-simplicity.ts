import type { Section } from '../types'

// Closes the chapter with a restraint lesson: the plain function often beats every pattern shown. Bridge into Chapter 10 is in the narration. singledispatch picks by the first argument's type, verified with float, list, str and int.
export const dispatchStrategiesAndSimplicity: Section = {
  id: 'dispatch-strategies-and-simplicity',
  title: "Dispatch strategies, and choosing direct code over abstraction",
  scene: 'dispatch-choices',
  focus: 'ways',
  slide: `## Dispatch strategies and simplicity

**Dispatch** means choosing which code runs.

### Four options
- **Dict of functions**: add cases by registering; unknown gives \`KeyError\`
- **\`if\` / \`match\`**: all cases visible together; add a default
- **\`singledispatch\`**: picks by the **type** of the first argument
- **Classes**: when behaviour carries state


### Registries
- A decorator can record functions in a dict: \`@command("add")\`

### Choosing
- Match the **situation** to the tool in the table

### Direct code first
- Every layer adds something to read, test and debug
- A plain \`price(qty)\` function needs none of these
- Abstract at **two real cases**, not one hypothetical`,
  narration:
    "We now have many ways to choose which code runs, so this section is about choosing between them. Take the three pricing rules from earlier chapters. The first option is a dictionary of functions, mapping each pricing name to its function. Looking up the function and calling it is a single line, new cases are added by registering a function, and an unknown name raises a KeyError. The second option is an if chain or a match statement, which keeps every case visible in one place, and a final default case can raise a clear error for unknown input. The third option is singledispatch from functools. It chooses the function by the type of the first argument. We register a float formatter and a list formatter, and the right one runs: three point one four one five nine becomes three point one four, and a list becomes its items formatted and joined. Other types fall back to the default. A decorator can also build a registry, like the command decorator that records each function in a dictionary under a name. Use classes when behaviour carries state, as in Chapter 7. The table matches situations to tools. But notice the last point, and the most important. Every layer of abstraction is something else for a reader to understand, test, and debug. A pricing function that always charges the same way needs none of these. Write the direct code first. Add a dictionary, a decorator, or a class when you have two real cases that differ, not one hypothetical case that might someday appear. Code is now composable. Next, we decide how independently waiting or computing work should execute.",
}
