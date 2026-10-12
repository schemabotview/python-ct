import type { Section } from '../types'

// The type statement and bracketed generics need Python 3.12 or later. Nothing here claims how 3.14 evaluates annotations; the point is that hints are not enforced, shown by calls that run. No type checker is required and none is named as the one to use.
export const typeHintsGenericsAndProtocols: Section = {
  id: 'type-hints-generics-and-protocols',
  title: "Type aliases, generics, Protocol, and static versus runtime guarantees",
  scene: 'typing-vs-runtime',
  focus: 'hints',
  slide: `## Type hints, generics, and protocols

### Aliases
- \`type Price = float\` gives a type a descriptive name
- \`type Line = tuple[str, int, Price]\` builds on it
- Python 3.12 added the \`type\` statement

### Generics
- \`def first[T](items: list[T]) -> T\`: the result follows the input
- \`class Box[T]\` holds one kind of thing

### Protocols
- \`class Priced(Protocol)\` names a **behaviour**
- Anything with a matching \`price()\` method fits: duck typing, written down

### Static versus runtime
- A **type checker** reads hints **before** running
- Python itself does **not** enforce them: \`g("a")\` runs
- \`isinstance\` with a protocol needs \`@runtime_checkable\``,
  narration:
    "Chapter 4 said that annotations are documentation that Python does not enforce. This section shows what they are for. A type alias gives a type a descriptive name. In Python three point twelve and later, the type statement does it: type Price equals float, and then type Line as a tuple of a string, an integer, and a Price. The signature of total can then say it takes a list of Line and returns a Price, which reads like documentation. Generics describe how types relate. First of T, in square brackets, is a function whose result type follows its input: give it a list of integers and the result is an integer, give it a list of strings and the result is a string. A generic class, like Box of T, holds one kind of thing. Protocols connect to what you learned about duck typing in Chapter 7. The Priced protocol declares a price method, and any object with a matching method fits it, with no shared parent, so it writes the duck typing down in a form that tools can read. Now the vital point, shown in the table. A static type checker is a separate tool that reads your hints before the program runs and reports mismatches. Python itself does not enforce them. Calling g with a string, where an integer is declared, runs until the arithmetic inside fails. A function annotated to return a string can return an integer, and nothing complains. Passing an object without a price method fails with an AttributeError, but only when the call happens. And checking a protocol with isinstance works only if you mark it runtime checkable, and then it checks only that the methods exist. No particular checker is required for this course. So treat hints as a contract for readers and tools, and keep runtime validation for the boundaries where untrusted data enters. Next, choosing between all these tools.",
}
