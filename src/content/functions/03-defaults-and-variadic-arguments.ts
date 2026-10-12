import type { Section } from '../types'

// The shared-default failure is shown before its fix on purpose; the second call returning the first call's item is the lesson. Defaults evaluated once at def time is the rule that explains it.
export const defaultsAndVariadicArguments: Section = {
  id: 'defaults-and-variadic-arguments',
  title: "Defaults, mutable-default pitfalls, and variadic arguments",
  scene: 'defaults-variadics',
  focus: 'basket',
  slide: `## Defaults and variadic arguments

### Defaults
- \`rate=0.5\` makes an argument optional
- A default is evaluated **once**, when \`def\` runs

### Rules for defaults
- \`price_with_tax(10)\` uses the default; \`price_with_tax(10, 1.0)\` overrides it
- Parameters with defaults come **after** those without

### The mutable-default trap
- \`basket=[]\` is one list, shared by **every** call
- Fix: default to \`None\`, then build a new list inside

### Variadic parameters
- \`*prices\` collects extra positional arguments into a **tuple**
- \`**details\` collects extra keyword arguments into a **dict**
- \`f(*items)\` and \`f(**record)\` unpack when **calling**
- Signature order: ordinary, \`*args\`, keyword-only, \`**kwargs\``,
  narration:
    "A parameter can have a default value, written with an equals sign in the definition. If the caller omits that argument, Python uses the default, so price with tax of ten with a default rate of zero point five gives fifteen. A parameter with a default must come after those without one, or Python raises a SyntaxError. Now, a rule that surprises almost everyone: a default is evaluated once, when the def statement runs, not each time the function is called. For a number, that makes no difference. But if the default is a mutable object, such as an empty list, every call that uses the default shares that one list. Look at the first function in the card. The first call adds tea and returns a list holding tea. The second call adds mug, and returns tea and mug, because it is the same list. The second call sees the first call's item. The fix is shown below it. Make the default None, which cannot be changed, and then create a fresh list inside the function when the argument was not supplied. Now variadic parameters, which accept any number of arguments. A parameter with one star collects all the extra positional arguments into a tuple, so total of four point five and eight puts a tuple of two prices in prices. A parameter with two stars collects extra keyword arguments into a dictionary. In a full signature the order is ordinary parameters, then star args, then keyword-only parameters, then double-star kwargs. The stars also work the other way when calling: star in front of a list unpacks it into separate positional arguments, and two stars in front of a dictionary unpacks it into keyword arguments. Next, what really happens to an argument when a function receives it.",
}
