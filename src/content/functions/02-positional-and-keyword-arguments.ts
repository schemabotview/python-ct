import type { Section } from '../types'

// The three TypeErrors are shown because wrong calls are the learner's first real encounter with function errors, and each message names its own cause.
export const positionalAndKeywordArguments: Section = {
  id: 'positional-and-keyword-arguments',
  title: "Positional and keyword arguments; positional-only and keyword-only parameters",
  scene: 'argument-kinds',
  focus: 'calls',
  slide: `## Arguments: positional, keyword, and restricted

### Passing arguments
- **Positional**: matched by order, \`line_total(3, 4.5)\`
- **Keyword**: matched by name, in any order: \`line_total(price=4.5, qty=3)\`
- Positional arguments must come before keyword ones

### Parameter kinds
- Parameters before \`/\` are **positional-only**
- Parameters after \`*\` are **keyword-only**
- Everything between accepts either style

### Why keywords help
- \`apply(10, 0.5, places=0)\` explains itself; \`apply(10, 0.5, 0)\` does not
- A keyword-only option cannot be passed by accident

### Wrong calls raise a \`TypeError\`
- Too few: missing a required argument
- Too many positional arguments
- The same parameter given twice`,
  narration:
    "There are two main ways to pass arguments. A positional argument is matched to a parameter by its order, so line total of three and four point five gives qty three and price four point five. A keyword argument is matched by name, so you can pass price equals four point five and qty equals three in either order, and the result is the same. You can mix the two, but positional arguments must come first. Keywords make calls easier to read, especially when a function has many parameters, because the call explains itself. A wrong call raises a TypeError, and the message tells you why. Passing only one argument says a required argument is missing. Passing three says the function takes two but three were given. And passing qty both by position and by keyword says that it got multiple values for qty. Function definitions can also restrict how a parameter is passed. In the table, the signature is apply with price, a slash, rate, a star, and places. Parameters before the slash are positional-only, so the caller cannot pass price by name. Parameters after the bare star are keyword-only, so the caller must write places equals something. Parameters in between, like rate, accept either style. Keywords also help readers: apply of ten, zero point five, places equals zero explains itself, while a bare trailing zero does not. This is useful in a library, where you may want the freedom to rename a parameter later without breaking callers, or you want to force callers to name an easily confused option. Next, giving arguments default values.",
}
