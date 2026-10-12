import type { Section } from '../types'

// Chapter 2 asked the learner to read a for loop inside a comprehension; here it is explained properly. The state table is the central tool: every loop in this chapter is traced the same way.
export const forLoopsRangeEnumerateAndZip: Section = {
  id: 'for-loops-range-enumerate-and-zip',
  title: "for loops and iteration with range, enumerate, and zip",
  scene: 'for-trace',
  focus: 'loop',
  slide: `## for loops and iteration

A **loop** repeats a block. A \`for\` loop takes one item at a time from an **iterable**.

### The shape
- \`for price in prices:\` binds \`price\` to each item in turn
- Strings, lists, tuples, dict keys and sets are iterable
- The loop variable keeps its last value afterwards

### Counting with range
- \`range(3)\` gives 0, 1, 2: the stop value is **excluded**
- \`range(1, 6, 2)\` gives 1, 3, 5

### Two helpers
- \`enumerate(items, 1)\` pairs a counter with each item
- \`zip(a, b)\` walks two collections together

### Accumulating
- Start the total **before** the loop and update it inside`,
  narration:
    "A loop repeats a block of code. The for loop is the loop for working through a collection: it takes one item at a time from something iterable, which means anything you can step through, such as a list, a string, a tuple, a dictionary's keys, or a set. In our example, for price in prices binds the name price to the first item, runs the indented block, then binds it to the second item, and so on, until the items run out. Each run through the block is called a pass. The table traces the loop state after each pass, and learning to fill in a table like this is the best way to understand any loop. Before the loop, total is zero. After the first pass it is four point five, after the second twelve point five, and after the third fourteen point seven five, which is what we print. This pattern, starting a value before the loop and updating it inside, is called accumulating. One detail: after the loop ends, the name price still refers to its last value. Now the helpers in the second card. Range produces a sequence of whole numbers. Range of three gives zero, one, two, because the stop value is excluded, just as with slices. Adding a start and a step, range of one to six by two gives one, three, five. Enumerate pairs a counter with each item, and giving it a start of one numbers the items from one. And zip walks two collections together, pairing the first with the first and the second with the second, and stopping when the shorter one runs out. Next, a loop that repeats until a condition changes.",
}
