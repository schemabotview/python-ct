import type { Section } from '../types'

// The generator prints as it runs so the suspended execution is visible rather than described. The decision to show StopIteration after the last next() ties back to the previous section's protocol.
export const generatorFunctionsAndYield: Section = {
  id: 'generator-functions-and-yield',
  title: "Generator functions, yield, suspended execution, and generator expressions",
  scene: 'generator-trace',
  focus: 'gen',
  slide: `## Generators and yield

A **generator function** uses \`yield\`: calling it returns a generator without running the body.

### Execution state
- \`next(g)\` runs the body **until the next \`yield\`**, then pauses
- Local variables and the position are kept between calls
- When the body ends, \`StopIteration\` is raised

### Why use one
- Values are produced **on demand**: no list is built
- A generator can be endless: a Fibonacci generator never has to finish

### Generator expressions
- \`(q * p for q, p in lines)\` is a one-line generator
- \`sum(q * p for ...)\` needs no extra brackets

### Notes
- A generator is its own iterator, so it is one-shot
- \`g.close()\` stops it early`,
  narration:
    "Writing a class with next and iter for every iterator is tedious. A generator function is a shortcut. Any function that contains the word yield is a generator function. When you call it, the body does not run. You get back a generator object, which is an iterator. The code card prints as it runs so you can see exactly what happens. Creating the generator prints nothing. The first call to next runs the body from the top, prints start, enters the loop, prints yield one, and reaches the yield statement. There it pauses, handing back the value A one thousand one. The function's local variables, and the exact place where it stopped, are kept. The second call to next resumes right after the yield, goes round the loop, prints yield two, and pauses again with A one thousand two. The third call resumes, the loop ends, done is printed, the body finishes, and Python raises StopIteration. The table traces those four steps. Why use a generator? Because it produces values on demand. Nothing builds a whole list in memory, and a generator can even be infinite, such as one that yields Fibonacci numbers forever, because the consumer only asks for as many as it needs. For simple cases, there is a one-line form called a generator expression. It looks like a list comprehension but with parentheses. Summing the line totals needs no extra brackets, so sum of q times p for each line gives twenty-one point five without ever building a list. Like every iterator, a generator can be consumed only once, and its close method stops it early. Next, chaining generators into lazy pipelines.",
}
