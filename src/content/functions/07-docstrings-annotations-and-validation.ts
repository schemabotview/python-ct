import type { Section } from '../types'

// The key teaching point is that annotations are not enforced. The example without validation proves it by running a bad call successfully. No type-checker tool is required.
export const docstringsAnnotationsAndValidation: Section = {
  id: 'docstrings-annotations-and-validation',
  title: "Docstrings, annotations, and runtime validation: different roles",
  scene: 'contracts',
  focus: 'contract',
  slide: `## Docstrings, annotations, and validation

Three tools, three different jobs.

### Docstring
- A string as the first line of the body explains the function
- It is stored in \`__doc__\` and shown by \`help()\`

### Annotations
- \`qty: int\` and \`-> float\` declare the **intended** types
- Python does **not** enforce them: \`plain_total("ab", 2)\` gives \`'abab'\`
- Editors and type checkers read them

### Runtime validation
- \`if qty < 0: raise ValueError(...)\` rejects bad values while running
- It is the only one of the three that stops bad input

### Where to validate
- At **boundaries**: user input, files, networks
- Inside trusted code, a clear contract is enough`,
  narration:
    "A function has a contract: what it expects, and what it promises. Python gives you three different tools to express it, and they do very different jobs. The first is a docstring, a string placed as the first line of the function body. It explains what the function does for readers. Python stores it, so the help function can show it, and it is available as the double-underscore doc attribute. The second tool is annotations. Writing colon int after a parameter and arrow float after the parameter list declares the types you intend. They are valuable documentation, and editors and type checkers read them, but Python itself does not enforce them. The proof is in the second function in the card: plain total is annotated to take an integer, yet calling it with the text ab and two runs without any complaint and returns abab, because text times a number repeats the text. The annotation did not stop it. The third tool is runtime validation, which is just ordinary code. If qty is less than zero, we raise a ValueError with a clear message. That check runs every time, and it is the only one of the three that actually rejects bad input. So use each for its purpose. Docstrings and annotations explain the contract to people and tools. Validation enforces it at runtime, at the places where untrusted data arrives. Where should you validate? At the boundaries, where untrusted data enters, such as user input or files. Inside trusted code, a clear docstring is usually enough. We will see more about raising and handling errors in the next chapter. Next, a function that calls itself.",
}
