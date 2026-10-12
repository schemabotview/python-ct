import type { Section } from '../types'

// Opens the course and the recurring order-total example. Defines the vocabulary every later
// section leans on: algorithm, source code, interpreter. "Python" here means CPython 3.14.
export const programsAndTheInterpreter: Section = {
  id: 'programs-and-the-interpreter',
  title: 'Programs, algorithms, and the interpreter',
  scene: 'program-pipeline',
  focus: 'interpreter',
  slide: `## Programs, algorithms, and the interpreter

A **program** is a precise list of instructions that a computer can carry out.

### Three ideas to keep apart
- **Algorithm** — the steps, in plain words
- **Source code** — those steps written in Python
- **Interpreter** — the program that reads source code and carries it out

### Our running example
Order total: multiply the price by the quantity, then show the answer.

### Why the difference matters
- The interpreter does **exactly** what the text says, never what you meant
- One algorithm can be written in many languages`,
  narration:
    "Imagine a shop that wants the total for an order. In plain words: take the price of one item, multiply it by how many were ordered, and show the answer. That list of steps is an algorithm. It says what to do, but it is not tied to any language, and a person could follow it with a pencil. Now we write those steps down in Python. What we write is called source code, and it is just ordinary text, saved in a file whose name ends in dot py. But a computer's processor cannot read Python text directly. So another program, called the interpreter, reads our source code and carries out each instruction, one statement at a time. What the interpreter produces comes out as a result, here on the screen. A program can also read input from outside, such as a quantity typed by a person, and we will meet that shortly. Throughout this course, the interpreter we mean is CPython, the standard one, at version three point fourteen. The important habit to take from this first section is that the interpreter does exactly what the text says. It never guesses what you meant. That is why the algorithm comes first and the code second, and it is why we will spend so much time tracing what each line really does. Next, we will run this order total for real, in two different ways.",
}
