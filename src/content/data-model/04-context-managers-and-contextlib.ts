import type { Section } from '../types'

// Completes the thread begun in Chapter 5, where with was used but not explained. The ExitStack close order (reverse of opening) was verified and is mentioned. Returning True from __exit__ is shown to suppress exceptions and flagged as rarely wanted.
export const contextManagersAndContextlib: Section = {
  id: 'context-managers-and-contextlib',
  title: "Context-manager protocols and contextlib",
  scene: 'context-managers',
  focus: 'protocol',
  slide: `## Context managers and contextlib

### The protocol
- \`with obj as name:\` calls \`obj.__enter__()\`; its result becomes \`name\`
- On leaving, it calls \`obj.__exit__(exc_type, exc, tb)\`, even after an error
- Returning **true** from \`__exit__\` hides the exception: rarely wanted

### The easy way
- \`@contextmanager\` turns a generator into a context manager
- Code before \`yield\` is setup; \`finally\` after it is cleanup

### Ready-made
- \`suppress(FileNotFoundError)\` ignores that one error
- \`redirect_stdout(buf)\` captures printing
- \`ExitStack\` manages a variable number of resources, closing them in reverse`,
  narration:
    "In Chapter 5, we used with to close files and promised to explain how it works. Now we can. A context manager is any object with two special methods. When a with statement starts, Python calls the object's enter method, and whatever it returns is bound to the name after as. When the block ends, however it ends, Python calls exit. Look at the class in the first card. Enter prints open and returns the object itself. Exit prints close. So running the with block prints open orders, then using orders, then close orders. And if the block raises an error, exit still runs, and it receives the exception's type, value, and traceback as arguments. Its return value matters. Returning False lets the exception continue on its way, which is what you almost always want. Returning True would hide the exception, a power to use rarely and carefully. Writing a class for this is verbose, so the standard library offers a shortcut. The contextmanager decorator, from the contextlib module, turns a generator function into a context manager. Everything before the yield is setup, the yielded value is bound by as, and the code after the yield, in a finally block, is cleanup that runs even if the block raises. This is the generator form in the second card, and it does exactly what the class does. The contextlib module also has ready-made managers. Suppress ignores one named exception. Redirect stdout captures printing into a buffer. And ExitStack manages a variable number of resources, closing them in reverse order. Next, what it means for two objects to be the same.",
}
