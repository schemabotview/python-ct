import type { Section } from '../types'

// Lambda is introduced here, as promised in Chapters 2 and 4, and bounded: one expression, no statements, and a poor name. The callable-object example previews that a function is just one kind of callable.
export const firstClassFunctionsAndCallbacks: Section = {
  id: 'first-class-functions-and-callbacks',
  title: "First-class functions, callable objects, lambdas, and callback interfaces",
  scene: 'callables',
  focus: 'values',
  slide: `## First-class functions and callbacks

A function is an **object**: store it, pass it, return it.

### Functions as values
- Store them in a dictionary: \`rules["tax"](10)\`
- Pass them as **callbacks**: \`sorted(x, key=fn)\`
- Built-in methods work too: \`str.strip\`

### Lambdas
- \`lambda v: v * 2\` is a small unnamed function
- It holds **one expression**: no statements, no assignment
- Its name is \`'<lambda>'\`, which shows up in tracebacks
- Use for one-off keys; otherwise write a \`def\`

### Callable objects
- A class with \`__call__\` makes instances callable
- \`callable(x)\` tests whether you can call something

### A good callback
- A clear contract: what it receives, what it returns`,
  narration:
    "In Chapter 4, we learned that a function is an object, and that you can pass line total to sorted as a key. This chapter builds on that. Because a function is a value, you can do anything with it that you can do with a value. In the first card, we put a function, a lambda, and the built-in string method strip into a dictionary, and call the one we want by name. We can pass functions to other functions, which is what a callback is, and we can return them from functions, which the next section uses. You have met lambda in passing, and now we can define it. A lambda is a small unnamed function. Lambda v colon v times two takes a value and returns it doubled. It is limited to a single expression, so it cannot contain statements, and an assignment inside one is a SyntaxError. And it has no real name: its name is the text lambda in angle brackets, which is unhelpful when you read a traceback. So use lambdas for one-off keys and callbacks, as in the max call that finds the biggest line, and write a proper def whenever the function deserves a name or needs more than one expression. Python has another kind of callable. Any object whose class defines the call method can be called like a function. The Rate class stores a rate when it is created, and each instance, called with a price, applies it. So a callable object is a function that also carries state. The table compares four kinds: a def function, a lambda, a callable object, and a closure, which we meet next. The built-in callable function tells you whether you can call something. A good callback has a clear contract about what it receives and returns, so name it well and document it. Next, functions that remember where they were created.",
}
