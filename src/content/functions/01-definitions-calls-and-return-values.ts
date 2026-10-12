import type { Section } from '../types'

// Opens the chapter by separating defining from calling, and returning from printing. The None result of a function without return is shown as a real value, not an absence.
export const definitionsCallsAndReturnValues: Section = {
  id: 'definitions-calls-and-return-values',
  title: "Definitions, calls, return values, None, and multiple results",
  scene: 'call-trace',
  focus: 'defs',
  slide: `## Functions: definitions, calls, and return values

A **function** is a named block of code you can run again with different inputs.

### Defining and calling
- \`def line_total(qty, price):\` defines it; the body runs only when called
- \`line_total(3, 4.5)\` calls it; **arguments** fill **parameters**

### Returning a value
- \`return\` sends a value back and ends the function
- Without \`return\`, a function gives back \`None\`
- \`print\` shows a value; it does not return it

### Ending early
- A \`return\` inside an \`if\` ends the function at that point

### Several results
- \`return a, b\` returns **one tuple**
- Unpack it: \`low, high = min_max(prices)\``,
  narration:
    "Until now, our order calculation has been a few lines we copy and change. A function packages those lines under a name so we can run them again with different inputs. You define one with def, a name, parameters in parentheses, and a colon, and then an indented body. Defining a function does not run it. The body runs only when you call the function, by writing its name with arguments in parentheses. An argument is the actual value you pass, and a parameter is the name that receives it. Look at the first function in the card. Calling line total with three and four point five binds qty to three and price to four point five, evaluates qty times price, and returns thirteen point five. The table traces those three steps. The word return sends a value back to the caller and ends the function immediately. Now the second function, which uses print instead of return. It shows thirteen point five on the screen, but it hands nothing back, so the name result is None. This is a very common beginner mistake: print displays a value to a person, and return gives a value to the program. A function with no return statement always returns None. A return can also sit inside an if, which ends the function early, and any lines after a return that has run never execute. The third function shows how to give back several results. Return min and max, separated by a comma, actually returns one tuple, and we unpack that tuple into low and high, two point two five and eight. Next, the different ways of passing arguments.",
}
