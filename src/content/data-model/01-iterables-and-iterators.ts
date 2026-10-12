import type { Section } from '../types'

// Opens the chapter by explaining what Chapter 3's for loop was doing. The Countdown class is its own iterator on purpose, which makes the one-shot behaviour a consequence the learner can see rather than a rule to memorise.
export const iterablesAndIterators: Section = {
  id: 'iterables-and-iterators',
  title: "Iterable and iterator protocols; iter, next, and exhaustion",
  scene: 'iterator-protocol',
  focus: 'by-hand',
  slide: `## Iterables and iterators

A \`for\` loop works on any **iterable**.

### The two protocols
- An **iterable** has \`__iter__\`, which returns an iterator
- An **iterator** has \`__next__\`; its \`__iter__\` returns itself
- \`iter(x)\` and \`next(it)\` call those methods

### What a for loop does
- Calls \`iter()\` once, then \`next()\` over and over
- Stops quietly when \`StopIteration\` is raised

### Exhaustion
- An iterator can be used **once**: a second \`list(it)\` gives \`[]\`
- A list is iterable, **not** an iterator: loop it as often as you like

### Your own
- \`Countdown\` is its own iterator, so it is one-shot too
- \`iter(5)\` raises \`TypeError: 'int' object is not iterable\``,
  narration:
    "In Chapter 3, a for loop worked on lists, strings, dictionaries, and ranges, and it did not matter which. This chapter explains what makes that possible. The answer is a pair of protocols, which are agreements about which special methods an object provides. An iterable is anything with an iter method that returns an iterator. An iterator is an object with a next method that returns the next value, and raises StopIteration when there are no more. The built-in functions iter and next call those methods. The code card does it by hand. We ask a list for an iterator, then call next. We get three, then five, and then the third call raises StopIteration. That exception is not an error. It is the signal that the loop uses to stop quietly. So a for loop does this: it calls iter once, then calls next repeatedly until StopIteration. Now notice what happens afterwards. Listing the same iterator again gives an empty list, because an iterator is used up. It does not rewind. That is the difference in the table. A list is iterable, but it is not an iterator, so asking a list for an iterator gives you a fresh one each time, which is why you can loop over a list as often as you like. An iterator's own iter method returns itself. You can write your own. Our Countdown class has an iter method that returns self, and a next method that counts down and raises StopIteration at zero. Because Countdown is its own iterator, it is one-shot too. If you ask for an iterator from something that has none, such as an integer, Python raises a TypeError saying it is not iterable. Next, a much easier way to write iterators.",
}
